const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const categoriesRouter = require('./routes/categories');
const companiesRouter = require('./routes/companies');
const productsRouter = require('./routes/products');

app.use('/api/categories', categoriesRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/products', productsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
