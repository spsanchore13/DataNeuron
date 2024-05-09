const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  componentId: Number,
  componentName: String,
  componentContent: String,
});

const Component = mongoose.model("Component", componentSchema);

module.exports = Component;
