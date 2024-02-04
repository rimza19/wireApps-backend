const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const DBSOURCE = "db.sqlite";

// Create a new SQLite database instance
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        // Enable foreign key constraints
        db.run('PRAGMA foreign_keys = ON;', function(err) {
            if (err) {
                console.error('Error enabling foreign key constraints:', err.message);
            } else {
                console.log('Foreign key constraints enabled successfully.');
            }
        });

        // Create the users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('owner', 'manager', 'cashier'))
        )`, async (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Users table created successfully.');

                // Define initial user data
                const initialUsers = [
                    {
                        name: 'John',
                        username: 'john12',
                        password: await bcrypt.hash('password123', 10), // Hashing the password
                        role: 'owner'
                    },
                    {
                        name: 'Khan',
                        username: 'khan12',
                        password: await bcrypt.hash('password456', 10), 
                        role: 'manager'
                    },
                    {
                        name: 'Shan',
                        username: 'shan12',
                        password: await bcrypt.hash('password789', 10), 
                        role: 'cashier'
                    }
                ];

                // Insert initial user data
                initialUsers.forEach((user) => {
                    db.run(`INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)`, 
                        [user.name, user.username, user.password, user.role], 
                        (err) => {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log(`User ${user.name} inserted successfully.`);
                            }
                        });
                });
            }
        });

        //creating the medicine table
        db.run(`CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            description TEXT,
            quantity INTEGER NOT NULL DEFAULT 0,
            active BOOLEAN DEFAULT TRUE
        )`, async (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Medicines table created successfully.');
            }
        } )
        
        //creating the customer table
        db.run(`CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            disease TEXT,
            age INTEGER NOT NULL,
            active BOOLEAN DEFAULT TRUE,
            prescribed_medicine TEXT NOT NULL, 
            FOREIGN KEY (prescribed_medicine) REFERENCES medicines(name)
        )`, async (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Customers table created successfully.');
            }
        } )
    }
});

module.exports = db;
