// authenticationController.js
const db = require("../database.js");
const bcrypt = require('bcrypt');

// Function to authenticate users
const authenticateUser = async (req, res) => {
   
    try {
        // Query the database to find the user with the provided username
        const { username, password } = req.body;
    
        db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
            if (err) {
                // Error while querying the database
                console.error(err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            if (!user) {
                // User with the provided username not found
                return res.status(401).json({ success: false, message: 'User not found' });
            }

            // Compare the password hash stored in the database with the provided password
            try {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    // Passwords do not match
                    return res.status(401).json({ success: false, message: 'Incorrect password' });
                }

                // Passwords match; return success response with user object
                return res.json({ success: true, user });
            } catch (error) {
                // Error while comparing passwords
                console.error(error);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
        });
    } catch (error) {
        // Error while querying the database
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    authenticateUser
};
