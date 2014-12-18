var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JudgeSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Judge', JudgeSchema);
