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


  router.get('/getIssues', async (req, res) => {
    try {
        const issues = await Issue.find(); // Retrieve all issues from the database
        res.json(issues); // Send the issues as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
  
  // Route to accept an issue
router.put('/accept/:id', async (req, res) => {
  try {
      const issue = await Issue.findByIdAndUpdate(req.params.id, { status: 'In Progress' }, { new: true });
      res.json(issue);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to reject an issue
router.put('/reject/:id', async (req, res) => {
  try {
      const issue = await Issue.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
      res.json(issue);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


  module.exports = router;
