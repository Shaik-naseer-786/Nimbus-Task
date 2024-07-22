const express = require('express');
const router = express.Router();
const handleRequest = require('../utils/handleRequest');

router.get('/', (req, res) => handleRequest(req, res, '/products'));

module.exports = router;
