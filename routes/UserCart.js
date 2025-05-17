const express = require('express');
const router = express.Router();
const usersCredentials = require('../models/UserModel');

// Dummy handler to prevent 500 errors from undefined /_logs
router.get('/_logs', (req, res) => {
    res.status(204).send(); // No content
});

// GET all users
router.get('/', async (req, res) => {
    try {
        const userDetails = await usersCredentials.find();
        res.status(200).json({ message: "User details successfully fetched", userDetails });
    } catch (error) {
        res.status(400).json({ message: "Not found" });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const userDetail = await usersCredentials.findById(req.params.id);
        if (!userDetail) {
            return res.status(400).json({ message: "User details are not present" });
        }
        res.status(200).json({ message: "User detail fetched successfully", userDetail });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

// POST create user
router.post('/', async (req, res) => {
    try {
        if ((req.body.email).includes('@gmail')) {
            const { username, password, email, gender, number, date_of_birth, createdAt } = req.body;

            const userDetails = new usersCredentials({
                username, password, email, gender, number, date_of_birth, createdAt
            });

            await userDetails.save();
            res.status(201).json({ message: 'User created successfully', userDetails });
        } else {
            res.status(401).json({ message: 'Invalid email' });
        }
    } catch (error) {
        res.status(400).json({ message: "Error while creating a user", error });
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const { username, password, email, gender, number, date_of_birth, createdAt } = req.body;
        const userDetail = await usersCredentials.findByIdAndUpdate(
            req.params.id,
            { username, password, email, gender, number, date_of_birth, createdAt },
            { new: true }
        );
        if (!userDetail) {
            return res.status(400).json({ message: "Error updating user" });
        }
        res.status(201).json({ message: "Successfully updated", userDetail });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

// PATCH update user partially
router.patch('/:id', async (req, res) => {
    try {
        const { username, password, email, gender, number, date_of_birth, createdAt } = req.body;
        const userDetails = await usersCredentials.findByIdAndUpdate(
            req.params.id,
            { username, password, email, gender, number, date_of_birth, createdAt },
            { new: true }
        );
        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json({ message: "User details successfully updated", userDetails });
    } catch (error) {
        res.status(500).json({ message: 'User detail updating failed', error });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const user = await usersCredentials.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "Delete failed" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

module.exports = router;
