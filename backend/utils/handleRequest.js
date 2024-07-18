const axios = require('axios');
const BASE_URL = process.env.JSON_SERVER_URL;

const handleRequest = async (req, res, endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, { params: req.query });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from json-server' });
    }
};

module.exports = handleRequest;
