const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
 
});

adminSchema.pre("save", async function (next) {
  const admin = this;
  // console.log("Just before saving before hashing", admin.password);
  if (!admin.isModified("password")) {
    return next();
  }
  admin.password = await bcrypt.hash(admin.password, 8);
  // console.log("Just before saving & after hashing", admin.password);
  next();
});

module.exports = mongoose.model("Admin", adminSchema);

