var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicantSchema = new Schema({
  id: { type: Number, min: 0 , unique: true },
  linkedin: String,
  twitter: String,
  github: String,
  personal: String,
  personality: [String],
  deathlyHallow: String,
  devpost: String,
  reason: String,
  resume: String
});

var Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
