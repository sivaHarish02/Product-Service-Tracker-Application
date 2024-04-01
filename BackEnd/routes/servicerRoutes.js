const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Issue =mongoose.model("Issue")
const Report = require('../models/report');

require("dotenv").config();

router.post('/reports', async (req, res) => {
    try {
      // Extract report data from the request body
      const { issueId, servicemanName, product, productIssue, workReport, date } = req.body;
  
      // Save the report to the database
      const newReport = new Report({
        issueId,
        servicemanName,
        product,
        productIssue,
        workReport,
        date,
      });
      await newReport.save();
  
      // Update the status of the corresponding issue to "Resolved"
      await Issue.findByIdAndUpdate(issueId, { status: 'Resolved' });
  
      // Respond with success message
      res.status(201).json({ message: 'Report saved successfully' });
    } catch (error) {
      console.error('Error saving report:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;