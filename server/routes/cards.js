const express = require("express");
const router = express.Router();
const cards = require("../controllers/cards");

router.get("/", cards.list);
router.get("/:id", cards.details);
router.get("/user/:id", cards.userCards);
router.get("/user/:id/favorites", cards.favoriteCards);

router.post("/", cards.add);
router.patch("/:id", cards.updateDetails);
router.delete("/:id", cards.delete);

router.post("/user/:user_id/favorites/:card_id", cards.addFavorite);
router.delete("/user/:user_id/favorites/:card_id", cards.deleteFavorite);

module.exports = router;
