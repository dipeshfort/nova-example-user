var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

console.log("DBURL", process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    res.render('pages/db', result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: process.env.APPLICATION_NAME, 
    version: "v1.0.1" 
  });
});

module.exports = router;
