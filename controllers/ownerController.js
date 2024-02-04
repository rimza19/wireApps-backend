const db = require("../database.js");

    // Function to get all active medicines
    const getActiveMedications = (req, res) => {
        // SQL query to retrieve active medication records
        const sql = 'SELECT * FROM medicines WHERE status = ?';

        // Execute the SQL query with the status parameter set to true
        db.all(sql, [true], (err, medicines) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Return the retrieved medication records as JSON response
            res.json({ medicines });
        });
    };

    //Function to get all medicines
        const getAllMedications = (req, res) => {
            // SQL query to retrieve all medication records
            const sql = 'SELECT * FROM medicines';
        
            // Execute the SQL query
            db.all(sql, [], (err, medicines) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                
                // Return the retrieved medication records as JSON response
                res.json({ medicines });
            });
        };

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
        const sql = 'UPDATE medicines SET active = FALSE WHERE id = ?';

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

/////// CUSTOMER API 

    //Function to get all the customers
        const getAllCustomers = (req, res) => {
            // SQL query to retrieve all medication records
            const sql = 'SELECT * FROM customers';
        
            // Execute the SQL query
            db.all(sql, [], (err, customers) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                
                // Return the retrieved medication records as JSON response
                res.json({ customers });
            });
        };

    // Function to insert a new customer record
    const insertCustomer = (req, res) => {
        const { name, disease , age } = req.body;

        // SQL query to insert a new customer record
        const sql = 'INSERT INTO customers (name, disease,age) VALUES (?, ?, ?)';

        // Execute the query
        db.run(sql, [name, disease,age], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'Customer record inserted successfully' });
        });
    };

    // Function to update an existing customer record
    const updateCustomer = (req, res) => {
        const { name, disease , age } = req.body;
        const { id } = req.params;

        // SQL query to update the customer record
        const sql = 'UPDATE customers SET name = ?, disease  = ? , age = ? WHERE id = ?';

        // Execute the query
        db.run(sql, [name,  disease , age, id], (err) => {
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
        const sql = 'UPDATE customers SET active = FALSE WHERE id = ?';

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
        getActiveMedications,

        getAllMedications,
        insertMedication,
        updateMedication,
        softDeleteMedication,
        deleteMedication,

        getAllCustomers,
        insertCustomer,
        updateCustomer,
        softDeleteCustomer,
        deleteCustomer
};