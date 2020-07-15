const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        items: {
            type: Array

        }
    },

    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
