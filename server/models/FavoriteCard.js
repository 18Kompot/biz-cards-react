const mongoose = require("mongoose");

const favoriteCardScheme = new mongoose.Schema({
    card_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const FavoriteCard = mongoose.model("favoriteCard", favoriteCardScheme);
exports.FavoriteCard = FavoriteCard;