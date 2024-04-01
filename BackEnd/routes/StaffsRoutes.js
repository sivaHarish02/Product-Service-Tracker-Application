const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Monitor, PC, Keyboard, Light, Fan, AC } = require('../models/product');
const Issue =mongoose.model("Issue")


require("dotenv").config();

router.get('/getProducts', async (req, res) => {
    try {
      const { type } = req.query; // Retrieve the type from query parameters
  
      let Model;
      switch (type) {
        case 'Monitors':
          Model = Monitor;
          break;
        case 'PCs':
          Model = PC;
          break;
        case 'Keyboards':
          Model = Keyboard;
          break;
        case 'Lights':
          Model = Light;
          break;
        case 'Fans':
          Model = Fan;
          break;
        case 'AC':
          Model = AC;
          break;
        default:
          return res.status(400).json({ message: 'Invalid product type' });
      }
  
      const products = await Model.find();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.post('/submit-ticket', async (req, res) => {
    const { productId, productName, issueType, location } = req.body;
  
    try {
      let Model;
      switch (productName) {
        case 'Monitors':
          Model = Monitor; // Replace with your actual model for monitors
          break;
        case 'PCs':
          Model = PC; // Replace with your actual model for PCs
          break;
        case 'Keyboards':
          Model = Keyboard; // Replace with your actual model for Keyboard
          break;
        case 'Lights':
          Model = Light; // Replace with your actual model for Lights
          break;
        case 'Fans':
          Model = Fan; // Replace with your actual model for Fans
          break;
        case 'AC':
          Model = AC; // Replace with your actual model for AC units
          break;
        default:
          return res.status(400).json({ message: 'Invalid product name' });
      }
  
      // Find the product by productId in the corresponding Model
      const product = await Model.findOne({ Id: productId });
      console.log(product);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Update product status (assuming 'Repair' is the appropriate status)
      product.status = 'Repair';
      await product.save();
  
      // Create a new issue instance using the Issue model
      const newIssue = new Issue({
        productId,
        productName,
        issueType,
        location,
        status: 'Pending' // Default status is 'Pending'
      });
  
      // Save the new issue and product simultaneously (using Promise.all)
      await Promise.all([product.save(), newIssue.save()]); // Ensures both updates succeed or fail together
  
      // Respond with a success message
      res.json({ message: 'Ticket submitted successfully and product status updated' });
    } catch (error) {
      console.error('Error submitting ticket or updating product status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;