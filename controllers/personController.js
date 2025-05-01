const Person = require('../models/personModel');


const getAllPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json({
      success: true,
      count: people.length,
      data: people
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch people',
      error: err.message
    });
  }
};


const getPerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    
    if (!person) {
      return res.status(404).json({
        success: false,
        message: 'Person not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: person
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch person',
      error: err.message
    });
  }
};


// Private/Admin Create person (director/actor)
const createPerson = async (req, res) => {
  try {
    const existingPerson = await Person.findOne({ 
      name: req.body.name,
      birthDate: req.body.birthDate
    });

    if (existingPerson) {
      return res.status(400).json({
        success: false,
        message: 'Person already exists'
      });
    }
    
    const newPerson = await Person.create(req.body);
    res.status(201).json({
      success: true,
      data: newPerson
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to create person',
      error: err.message
    });
  }
};

// Private/Admin  Update person
const updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!person) {
      return res.status(404).json({
        success: false,
        message: 'Person not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: person
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to update person',
      error: err.message
    });
  }
};


//Private/Admin Delete person
const deletePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    
    if (!person) {
      return res.status(404).json({
        success: false,
        message: 'Person not found'
      });
    }
    
    res.status(204).json({
      success: true,
      data: null
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete person',
      error: err.message
    });
  }
};

module.exports = {
  getAllPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
};