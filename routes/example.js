const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
	res.send('Example page');
});

module.exports = route;