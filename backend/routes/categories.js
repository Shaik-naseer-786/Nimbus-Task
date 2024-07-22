const express = require('express');
const router = express.Router();
const handleRequest = require('../utils/handleRequest');

// Route for /categories endpoint
router.get('/', (req, res) => handleRequest(req, res, '/categories'));

// Route for /categories/:category/products endpoint
router.get('/:category/products', (req, res) => {
    const endpoint = `/categories/${req.params.category}/products`;
    const queryParams = { ...req.query };
    if (queryParams.minPrice) queryParams.minPrice = parseInt(queryParams.minPrice);
    if (queryParams.maxPrice) queryParams.maxPrice = parseInt(queryParams.maxPrice);
    handleRequest(req, res, endpoint);
});

module.exports = router;
