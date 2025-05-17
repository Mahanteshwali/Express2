const express = require('express');
const router = express.Router();
const food = require('../models/foodModel');

// Get all food items
router.get('/', async (req, res) => {
    try {
        const foods = await food.find();
        res.status(200).json({ message: 'All food items fetched successfully', foods });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

// Get a single food item by ID
router.get('/:id', async (req, res) => {
    try {
        const single_food = await food.findById(req.params.id);
        if (!single_food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json({ message: 'Food item fetched successfully', single_food });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

// Create a new food item
router.post('/', async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.body;
        const food_item = new food({ name, description, price, category, quantity });
        await food_item.save();
        res.status(201).json({ message: 'Food item created successfully', food_item });
    } catch (err) {
        res.status(400).json({ message: 'Failed to create food item', error: err });
    }
});

// Update food item using PUT
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.body;
        const updated_food = await food.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, quantity },
            { new: true }
        );
        if (!updated_food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json({ message: 'Food item updated successfully', updated_food });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

// Update food item using PATCH
router.patch('/:id', async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.body;
        const updated_food = await food.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, quantity },
            { new: true }
        );
        if (!updated_food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json({ message: 'Food item updated successfully', updated_food });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// Delete a food item
router.delete('/:id', async (req, res) => {
    try {
        const deleted_food = await food.findByIdAndDelete(req.params.id);
        if (!deleted_food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

module.exports = router;
