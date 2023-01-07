const joi = require("joi");
const { User } = require("../models/User");
const { Card } = require("../models/Card");

module.exports = {
  list: async function (req, res, next) {
    try {
      const result = await Card.find({});
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting cards" });
    }
  },

  details: async function (req, res, next) {
    try {
      const schema = joi.object({
        id: joi.string().required(),
      });

      const { error, value } = schema.validate(req.params);

      if (error) {
        console.log(error.details[0].message);
        throw Object.assign(new Error("error get details"), { code: 402 });
      }

      const card = await Card.findById(value.id);
      if (!card)
        throw Object.assign(new Error("Invalid card ID, no such card"), {
          code: 402,
        });
      res.json(card);
    } catch (err) {
      res.status(400).json({ error: "Invalid data" });
      console.log(`Error: ${err}`);
    }
  },

  userCards: async function (req, res, next) {
    try {
      const schema = joi.object({
        id: joi.string().required(),
      });

      const { error, value } = schema.validate(req.params);

      if (error) {
        console.log(error.details[0].message);
        throw Object.assign(new Error("error get the details"), { code: 402 });
      }

      const user = await User.findById(value.id);
      if (!user || !user.isBiz)
        throw Object.assign(new Error("Invalid user ID, no such user"), {
          code: 402,
        });

      const cards = await Card.find({ user_id: user._id });
      res.json(cards);
    } catch (err) {
      res.status(400).json({ error: `error get cards of a user` });
      console.log(err.message);
    }
  },

  addNew: async function (req, res, next) {
    try {
      const user = await User.findOne({ email: req.token.email });
      if (!user || !user.isBiz)
        throw Object.assign(new Error("Not a business user"), { code: 402 });

      const schema = joi.object({
        title: joi.string().min(2).max(256).required(),
        subTitle: joi.string().min(2).max(256).required(),
        address: joi.string().min(2).max(256).required(),
        phone: joi.string().min(9).max(14).required(),
        url: joi.string().min(6).max(1024),
        alt: joi.string().min(2).max(256),
      });

      const { error, value } = schema.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        throw Object.assign(new Error("error add card"), { code: 402 });
      }

      const card = new Card({
        title: value.title,
        subTitle: value.subTitle,
        description: value.description,
        address: value.address,
        phone: value.phone,
        image: {
          url: value.url
            ? value.url
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          alt: value.alt ? value.alt : "Pic Of Business Card",
        },
        bizNumber: Math.floor(Math.random() * 10000000),
        user_id: user._id,
      });

      const newCard = await card.save();
      res.json(newCard);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ error: `error adding card` });
    }
  },

  updateDetails: async function (req, res, next) {
    try {
      const user = await User.findOne({ email: req.token.email });
      if (!user || !user.isBiz)
        throw Object.assign(new Error("Not a business user"), { code: 402 });

      const schema = joi
        .object({
          title: joi.string().min(2).max(256).required(),
          subTitle: joi.string().min(2).max(256).required(),
          description: joi.string().min(2).max(1024).required(),
          address: joi.string().min(2).max(256).required(),
          phone: joi.string().min(9).max(14).required(),
          url: joi.string().min(6).max(1024),
          alt: joi.string().min(2).max(256),
        })
        .min(1);

      const { error, value } = schema.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        throw Object.assign(new Error("error updating a card"), { code: 402 });
      }

      const filter = {
        _id: req.params.id,
        userID: user._id,
      };

      const card = await Card.findOneAndUpdate(filter, value);
      if (!card)
        throw Object.assign(new Error("No card with this ID in the database"), {
          code: 402,
        });
      const uCard = await Card.findById(card._id);
      res.json(uCard);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ error: `error updating card` });
    }
  },

  deleteCard: async function (req, res, next) {
    try {
      const user = await User.findOne({ email: req.token.email });
      if (!user || !user.isBiz)
        throw Object.assign(new Error("Not a business user"), { code: 402 });

      const schema = joi.object({
        id: joi.string().required(),
      });

      const { error, value } = schema.validate(req.params);

      if (error) {
        console.log(error.details[0].message);
        throw Object.assign(new Error("Error deleting the card"), {
          code: 402,
        });
      }

      const deleted = await Card.findOneAndRemove({
        _id: value.id,
        user_id: user._id,
      });

      if (!deleted)
        throw Object.assign(new Error("Failed to delete"), { code: 402 });
      res.json(deleted);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ error: `error delete card` });
    }
  },
};
