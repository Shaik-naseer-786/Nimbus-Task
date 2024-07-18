const express = require('express');
const router = express.Router();
const handleRequest = require('../utils/handleRequest');

router.get('/', (req, res) => handleRequest(req, res, '/companies'));

router.get('/:company/categories/:category/products', (req, res) => {
    const endpoint = `/companies/${req.params.company}/categories/${req.params.category}/products`;
    handleRequest(req, res, endpoint);
});



router.get('/:company/products', (req, res) => {
    const endpoint = `/companies/${req.params.company}/products`;
    handleRequest(req, res, endpoint);
});


module.exports = router;
