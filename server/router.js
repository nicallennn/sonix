//imports
const express = require('express');
const router = express.Router();

//import the controller methods
// const { *methods } = require('./controllers/*');

//define the api routes
router.get('/', (req, res) => {
  console.log('get working');
  res.send('hello from express');
});


//export the router
module.exports = router;