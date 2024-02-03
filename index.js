const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require("./database.js")

const authenticationRoutes = require('./routes/authRoutes');
const ownersRoutes = require('./routes/ownerRoutes.js');
const managerRoutes = require('./routes/managerRoutes.js')
const cashierRoutes = require('./routes/cashierRoutes.js')

const defaultRoutes = require('./routes/defaultRoutes.js')

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mount route modules
app.use('/api/auth', authenticationRoutes);

app.use('/api/owner', ownersRoutes);

app.use('/api/manager', managerRoutes);

app.use('/api/cashier', cashierRoutes);

app.use('/api', defaultRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Pharmacy Management System API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
