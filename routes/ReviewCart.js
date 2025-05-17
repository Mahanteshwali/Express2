const express = require("express");
const router = express.Router();
const Review = require("../models/ReviewModel");

// Optional: Dummy handler to prevent 500 error from unknown /_logs
router.get('/_logs', (req, res) => {
  res.status(204).send(); // No Content
});

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ message: "Reviews fetched successfully", reviews });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// GET review by ID
router.get("/:id", async (req, res) => {
  try {
    const reviewItem = await Review.findById(req.params.id);
    if (!reviewItem) {
      return res.status(400).json({ message: "No review found" });
    }
    res.status(200).json({ message: "Review fetched successfully", reviewItem });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// POST create a review
router.post("/", async (req, res) => {
  try {
    const { product_id, name, description, ratings, createdAt } = req.body;
    const reviewItem = new Review({ product_id, name, description, ratings, createdAt });
    await reviewItem.save();
    res.status(201).json({ message: "Review created", reviewItem });
  } catch (error) {
    res.status(400).json({ message: "Failed to create a review", error });
  }
});

// PUT update a review
router.put("/:id", async (req, res) => {
  try {
    const { product_id, name, description, ratings, createdAt } = req.body;
    const reviewItem = await Review.findByIdAndUpdate(
      req.params.id,
      { product_id, name, description, ratings, createdAt },
      { new: true }
    );
    if (!reviewItem) {
      return res.status(400).json({ message: "Failed to update the review" });
    }
    res.status(200).json({ message: "Review updated", reviewItem });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// PATCH partial update
router.patch("/:id", async (req, res) => {
  try {
    const { product_id, name, description, ratings, createdAt } = req.body;
    const reviewItem = await Review.findByIdAndUpdate(
      req.params.id,
      { product_id, name, description, ratings, createdAt },
      { new: true }
    );
    if (!reviewItem) {
      return res.status(400).json({ message: "Failed to update the review" });
    }
    res.status(200).json({ message: "Review updated", reviewItem });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// DELETE review
router.delete("/:id", async (req, res) => {
  try {
    const reviewDelete = await Review.findByIdAndDelete(req.params.id);
    if (!reviewDelete) {
      return res.status(400).json({ message: "Failed to delete the review" });
    }
    res.status(200).json({ message: "Review successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
