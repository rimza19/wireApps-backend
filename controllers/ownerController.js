const db = require("../database.js");

    // Function to insert a new medication record
    const insertMedication = (req, res) => {
        const { name, description, quantity } = req.body;

        // SQL query to insert a new medication record
        const sql = 'INSERT INTO medicines (name, description, quantity) VALUES (?, ?, ?)';

        // Execute the query
        db.run(sql, [name, description, quantity], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'Medication record inserted successfully' });
        });

    }

    // Function to update an existing medication record
    const updateMedication = (req, res) => {
        const { name, description, quantity } = req.body;
        const { id } = req.params;

        // SQL query to update the medication record
        const sql = 'UPDATE medicines SET name = ?, description = ?, quantity = ? WHERE id = ?';

        // Execute the query
        db.run(sql, [name, description, quantity, id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'Medication record updated successfully' });
        });
    };

    // Function to soft delete a medication record
    const softDeleteMedication = (req, res) => {
        const { id } = req.params;

        // SQL query to soft delete the medication record
        const sql = 'UPDATE medicines SET active = 0 WHERE id = ?';

        // Execute the query
        db.run(sql, [id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'Medication record soft deleted successfully' });
        });
    };

    // Function to permanently delete a medication record
    const deleteMedication = (req, res) => {
        const { id } = req.params;

        // SQL query to permanently delete the medication record
        const sql = 'DELETE FROM medicines WHERE id = ?';

        // Execute the query
        db.run(sql, [id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'Medication record permanently deleted successfully' });
        });
    };

    // Function to insert a new customer record
    const insertCustomer = (req, res) => {
        const { name, email, phone } = req.body;

        // SQL query to insert a new customer record
        const sql = 'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)';

        // Execute the query
        db.run(sql, [name, email, phone], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'Customer record inserted successfully' });
        });
    };

    // Function to update an existing customer record
    const updateCustomer = (req, res) => {
        const { name, email, phone } = req.body;
        const { id } = req.params;

        // SQL query to update the customer record
        const sql = 'UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?';

        // Execute the query
        db.run(sql, [name, email, phone, id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'Customer record updated successfully' });
        });
    };

    // Function to soft delete a customer record
    const softDeleteCustomer = (req, res) => {
        const { id } = req.params;

        // SQL query to soft delete the customer record
        const sql = 'UPDATE customers SET is_deleted = 1 WHERE id = ?';

        // Execute the query
        db.run(sql, [id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'Customer record soft deleted successfully' });
        });
    };

    // Function to permanently delete a customer record
    const deleteCustomer = (req, res) => {
        const { id } = req.params;

        // SQL query to permanently delete the customer record
        const sql = 'DELETE FROM customers WHERE id = ?';

        // Execute the query
        db.run(sql, [id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'Customer record permanently deleted successfully' });
        });
    };

module.exports = {
        insertMedication,
        updateMedication,
        softDeleteMedication,
        deleteMedication,
        insertCustomer,
        updateCustomer,
        softDeleteCustomer,
        deleteCustomer
};