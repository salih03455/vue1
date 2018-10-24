const express = require('express');
const route = express.Router();
const LabelsModel = require('../models/labels');

route.get('/', (req, res) => {
	res.send('Example page');
});

route.post('/', (req, res) => {
	console.log(req.body);
	const Labels = new LabelsModel({
    label: req.body.data
	});
	Labels.save((err) => {
		if(err) {
			console.log(err);
		} else {
			res.json({
				success: true,
				message: 'Label saved successfully'
			});
		}
	});
});

module.exports = route;