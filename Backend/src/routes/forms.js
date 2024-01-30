const express = require('express');
const Form = require('../models/Forms');
const FormResponse = require('../models/FormResponse')
const router = express.Router();

// Create a new form
router.post('/create', async (req, res) => {
  const { title, questions } = req.body;

  try {
    const newForm = new Form({ title, questions });
    await newForm.save();

    res.status(201).json({ formId: newForm._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific form and its responses
router.get('/:formId', async (req, res) => {
  const formId = req.params.formId;

  try {
    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    // For simplicity, we assume form responses are stored in a separate collection
    // Modify this part based on your actual schema and data structure
    const responses = await Form.find({ formId });

    res.json({ form, responses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a response to a form
router.post('/:formId/submit', async (req, res) => {
  console.log(req.body)
  const formId = req.params.formId;
  const { answers } = req.body.answers;

  try {
    // For simplicity, we assume form responses are stored in a separate collection
    // Modify this part based on your actual schema and data structure
    const formResponse = await FormResponse.create({
      formId: formId,
      emailId: req.body.emailId,
      fullName: req.body.fullName,
      answers: answers,
    });
    console.log(formResponse)


    const form = await Form.findById(formId);
    form.responses.push(formResponse);
    await form.save();

    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
