const express = require('express');
const path = require('path');
const router = express.Router();
const package = require(path.resolve(__dirname, '../', 'package.json'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: process.env.APPLICATION_TITLE, 
    version: package.version 
  });
});

module.exports = router;
