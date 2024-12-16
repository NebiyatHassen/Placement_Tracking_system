const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
    unique: true,
  },
  graduationYear: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  employmentStatus: {
    type: String,
    enum: ["Employed", "Unemployed", "Self-Employed"],
    required: true,
  },
  company: String,
  position: String,
  sector: String,
  feedback: String,
});

const Survey = mongoose.model("survey", SurveySchema);
module.exports = Survey;
