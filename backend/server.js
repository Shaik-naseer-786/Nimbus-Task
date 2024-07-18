const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const categoriesRouter = require('./routes/categories');
const companiesRouter = require('./routes/companies');
const productsRouter = require('./routes/products');

app.use('/categories', categoriesRouter);
app.use('/companies', companiesRouter);
app.use('/products', productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
