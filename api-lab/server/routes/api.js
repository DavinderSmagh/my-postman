const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/request', requestController.handleRequest);

module.exports = router;
