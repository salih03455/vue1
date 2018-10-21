const mongoose = require('mongoose');

const LabelsSchema = mongoose.Schema({
	title: String,
	description: String,
	color: String
});

module.exports = mongoose.model('Labels', LabelsSchema);