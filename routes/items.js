const express = require('express');
const router = express.Router();
const Item = require('../models/ItemModel');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ message: 'Items fetched successfully', items });
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching items', error });
  }
});

// Get a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item fetched successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching item', error });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const item = new Item({ name, description, price, category });
    await item.save();
    res.status(201).json({ message: "Item successfully created", item });
  } catch (error) {
    res.status(400).json({ message: 'Error while creating item', error });
  }
});

// Update an item (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: "Item successfully updated", item });
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error });
  }
});

// Update an item (PATCH)
router.patch('/:id', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: "Item successfully updated", item });
  } catch (error) {
    res.status(500).json({ message: 'Item update failed', error });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: "Item deletion failed", error });
  }
});

module.exports = router;
