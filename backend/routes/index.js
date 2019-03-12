const express = require('express');
const router = express.Router();
const data = require('./channels.json');

router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', (req, res) => {
  res.send(data);
});

module.exports = router;
