const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true },
  optionId: { type: Number, required: true }
})

const formResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, required: true },
  emailId: { type: String, required: true },
  fullName: { type: String, required: true },
  answers: [answerSchema]
});

const FormResponse = mongoose.model('FormResponse', formResponseSchema);

module.exports = FormResponse;
