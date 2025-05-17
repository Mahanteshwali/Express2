const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 50 },
    category: { type: String, required: true, enum: ['IceCream', 'FullDish', 'Starters', 'Snacks','Others'] },
    createdAt: { type: Date, default: Date.now },
    quantity: { type: Number, min: 0, required:true},
});

module.exports = mongoose.model('food', foodSchema);