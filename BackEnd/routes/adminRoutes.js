const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Monitor, PC, Keyboard, Light, Fan, AC } = require('../models/product');

const Report = require('../models/report');

require("dotenv").config();

// Add Product Route
router.post('/addProduct', async (req, res) => {
    console.log(req.body);
    try {
      const { type, ...data } = req.body;
  
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
  
      // Attempt to insert the document into the collection
      await Model.create(data);
      res.status(201).json({ message: 'Product added successfully.' });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        res.status(400).json({ message: 'Duplicate key error: Id already exists.' });
      } else {
        // Other errors
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  });
  

  
router.delete('/deleteProduct/:type/:id', async (req, res) => {
    try {
        const { type, id } = req.params;
  
        let Model;
        switch (type) {
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
                return res.status(400).json({ message: 'Invalid product type' });
        }
  
        // Use the Model to delete the product based on the ID
        const result = await Model.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
  
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.put('/updateProduct/:type/:id', async (req, res) => {
    try {
        const { type, id } = req.params;
  
        let Model;
        switch (type) {
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
                return res.status(400).json({ message: 'Invalid product type' });
        }
  
        const updatedProductData = req.body; // Updated product data sent from the client
  
        // Update the product document in MongoDB using findByIdAndUpdate or similar method
        const updatedProduct = await Model.findByIdAndUpdate(id, updatedProductData, { new: true });
  
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
  
        res.json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.get('/reports', async (req, res) => {
    try {
      const reports = await Report.find();
      res.json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  module.exports = router;