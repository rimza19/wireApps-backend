const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require("./database.js")

const authenticationRoutes = require('./routes/authRoutes');
const ownersRoutes = require('./routes/ownerRoutes.js');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mount route modules
app.use('/api/auth', authenticationRoutes);

app.use('/api', ownersRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Pharmacy API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
