const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const netflixController = require('../controller/netflix.controller.js');

router.get('/titres/:type', (req, res) => {
    
    netflixController.listerTypeNetflixPage(req, res);
    
});

module.exports = router;