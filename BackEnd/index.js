const express = require("express");
const PORT = 0202;

const app = express();
const bodyParser = require("body-parser");
const db = {};
require('./db')
require('./models/User')
require('./models/admin')
require("./models/Issue")

const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const staffRoutes = require("./routes/StaffsRoutes")
const servicerRoutes = require("./routes/servicerRoutes")

const { Monitor, PC, Keyboard, Light, Fan, AC } = require("./models/product");

app.use(bodyParser.json());
app.use(authRoutes)
app.use(staffRoutes)
app.use(adminRoutes)
app.use(servicerRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
