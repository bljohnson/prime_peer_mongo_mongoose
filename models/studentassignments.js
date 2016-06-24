var mongoose = require('mongoose');
var Schema = mongoose.Schema; // schema property

var assignmentSchema = new Schema ({ // create schema/structure with field names and schema types
  student_name: String,
  assignment_number: Number,
  score: Number,
  date_completed: Date
}); // end assignmentSchema

var Assignment = mongoose.model('assignmentrecords', assignmentSchema);

module.exports = Assignment;
