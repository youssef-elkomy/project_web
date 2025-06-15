const Table = require('../models/table');

// Create a new table reservation
const createTable = async (req, res) => {
  try {
    const table = new Table(req.body);
    const savedTable = await table.save();
    res.status(201).json(savedTable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all table reservations
const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find().populate('user');
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific table reservation by ID
const getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id).populate('user');
    if (!table) {
      return res.status(404).json({ message: 'Table reservation not found' });
    }
    res.json(table);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a table reservation by ID
const updateTable = async (req, res) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTable) {
      return res.status(404).json({ message: 'Table reservation not found' });
    }
    res.json(updatedTable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a table reservation by ID
const deleteTable = async (req, res) => {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id);
    if (!deletedTable) {
      return res.status(404).json({ message: 'Table reservation not found' });
    }
    res.json({ message: 'Table reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTable,
  getAllTables,
  getTableById,
  updateTable,
  deleteTable,
};
