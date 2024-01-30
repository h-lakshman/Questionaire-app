const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
  optionId: { type: Number, required: true },
  option: { type: String, required: true }
})

const questionSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true },
  question: { type: String, required: true },
  options: [optionSchema],
  answer: { type: Number, required: true }
})

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FormResponse' }]
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
