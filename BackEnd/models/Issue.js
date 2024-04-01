const mongoose = require('mongoose');

// Define the schema for the issue
const issueSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    issueType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved',"Rejected"],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model for the issue schema
const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
