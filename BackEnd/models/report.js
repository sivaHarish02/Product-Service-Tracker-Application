const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
    required: true,
  },
  servicemanName: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  productIssue: {
    type: String,
    required: true,
  },
  workReport: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
