const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require("./database.js")
//const db = new sqlite3.Database('./db.sqlite');

const authenticationRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mount route modules
app.use('/api/auth', authenticationRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Pharmacy Management System API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
