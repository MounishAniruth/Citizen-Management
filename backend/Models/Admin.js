const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email_or_phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  unique_id: { type: String, required: true }, 
});

module.exports = mongoose.model("Admin", AdminSchema);
