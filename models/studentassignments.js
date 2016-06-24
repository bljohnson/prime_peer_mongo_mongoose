var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema ({
  student_name: String,
  assignment_number: Number,
  score: Number,
  date_completed: Date
}); // end assignmentSchema

var Assignment = mongoose.model('assignmentrecords', assignmentSchema);

module.exports = Assignment;
