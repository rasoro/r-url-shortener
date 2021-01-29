const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  code: String,
  sourceUrl: String,
  shortUrl: String,
  accessCount: Number,
});
urlSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  delete obj.accessCount;
  delete obj.__v;
  return obj;
 }
module.exports = mongoose.model("url", urlSchema);