var mongoose = require('mongoose');

var LogoComponentSchema = new mongoose.Schema({
  id: String,
  text: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  height: Number,
  width: Number
});

module.exports = mongoose.model('LogoComponent', LogoComponentSchema);