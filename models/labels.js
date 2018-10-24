const mongoose = require('mongoose');

const LabelsSchema = mongoose.Schema({
	label: Array
});

const Labels = module.exports = mongoose.model('Labels', LabelsSchema);