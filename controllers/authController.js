const db = require("../database.js");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Query the database to find the user with the provided username
        db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            if (!user) {
                return res.status(401).json({ success: false, message: 'User not found' });
            }

            try {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({ success: false, message: 'Incorrect password' });
                }

                // Generate JWT token with user's role included in the payload
                const token = jwt.sign({ username: username, role: user.role }, 'ATwebjsg', { expiresIn: '1h' });

                return res.json({ success: true, token: token });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    authenticateUser
};
