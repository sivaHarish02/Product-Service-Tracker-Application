const mongoose = require("mongoose");

const monitorSchema = new mongoose.Schema({
  type: {
      type: String,
      default: 'Monitors'
  },
  status:{
    type:String,
    default:"Running"
  },
  department:{
      type: String,
      required: true
  },
  Id: {
      type: Number,
      unique: true,
      required: true
  },
  monitorName: {
      type: String,
      required: true
  },
  monitorDisplayType: {
      type: String,
      required: true
  },
});

// Define schema for PCs
const pcSchema = new mongoose.Schema({
  type: {
      type: String,
      default: 'PCs'
  },
  status:{
    type:String,
    default:"Running"
  },
  department:{
    type: String,
    required: true
},
  Id: {
      type: Number,
      unique: true,
      required: true
  },
  pcModelName: {
      type: String,
      required: true
  },
  pcProcessor: {
      type: String,
      required: true
  },
  pcRam: {
      type: String,
      required: true
  },
  pcGraphics: {
      type: String,
      required: true
  }
});

// Define schema for keyboards
const keyboardSchema = new mongoose.Schema({
  type: {
      type: String,
      default: 'Keyboards'
  },
  status:{
    type:String,
    default:"Running"
  },
  department:{
    type: String,
    required: true
},
  Id: {
      type: Number,
      unique: true,
      required: true
  },
  keyboardName: {
      type: String,
      required: true
  }
});

// Define schema for lights
const lightSchema = new mongoose.Schema({
  type: {
      type: String,
      default: 'Lights'
  },
  status:{
    type:String,
    default:"Running"
  },
  department:{
    type: String,
    required: true
},
  Id: {
      type: Number,
      unique: true,
      required: true
  },
  lightsName: {
      type: String,
      required: true
  },
  lightsColor: {
      type: String,
      required: true
  },
  lightsWatts: {
      type: String,
      required: true
  }
});

// Define schema for fans
const fanSchema = new mongoose.Schema({
  type: {
      type: String,
      default: 'Fans'
  },
  status:{
    type:String,
    default:"Running"
  },
  department:{
    type: String,
    required: true
},
  Id: {
      type: Number,
      unique: true,
      required: true
  },
  fanName: {
      type: String,
      required: true
  },
  fanWatts: {
      type: String,
      required: true
  }
});

// Define schema for AC
const acSchema = new mongoose.Schema({
  type: {
      type: String,
      default: 'AC'
  },
  status:{
    type:String,
    default:"Running"
  },
  department:{
    type: String,
    required: true
},
  Id: {
      type: Number,
      unique: true,
      required: true
  },
  acName: {
      type: String,
      required: true
  },
  acWatts: {
    type: String,
    required: true
}
});

// Register models based on respective schemas
module.exports = {
  Monitor: mongoose.model('Monitor', monitorSchema),
  PC: mongoose.model('PC', pcSchema),
  Keyboard: mongoose.model('Keyboard', keyboardSchema),
  Light: mongoose.model('Light', lightSchema),
  Fan: mongoose.model('Fan', fanSchema),
  AC: mongoose.model('AC', acSchema)
};