const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const BASE_URL = process.env.JSON_SERVER_URL;

const handleRequest = async (req, res, endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, { params: req.query });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data from json-server' });
    }
  };
  
app.get('/categories', (req, res) => handleRequest(req, res, '/categories'));
app.get('/companies', (req, res) => handleRequest(req, res, '/companies'));
app.get('/products', (req, res) => handleRequest(req, res, '/products'));

app.get('/companies/:company/categories/:category/products', (req, res) => {
  const endpoint = `/companies/${req.params.company}/categories/${req.params.category}/products`;
  handleRequest(req, res, endpoint);
});

app.get('/companies/:company/products', (req, res) => {
  const endpoint = `/companies/${req.params.company}/products`;
  handleRequest(req, res, endpoint);
});

app.get('/categories/:category/products', (req, res) => {
  const endpoint = `/categories/${req.params.category}/products`;
  handleRequest(req, res, endpoint);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
