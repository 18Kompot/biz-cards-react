const joi = require("joi");
const { User } = require("../models/User");
const { Card } = require("../models/Card");

// ========================================================================== //
//
// logging function. Used by all functions in this module.
//
// ========================================================================== //
function logError(error) {
  console.log(`Server error in cards controller: ${error}`);
}

module.exports = {
  // ====================================================================== //
  //
  // Retrieves all cards from the database, returning them as JSON via the
  // result argument.
  //
  // ====================================================================== //
  list: async function (request, result, next) {
    try {
      // An empty find returns the complete set.
      const dataSet = await Card.find({});

      // Propogate the result back via result.
      result.json(dataSet);
    } catch (err) {
      logError(err);
      result.status(400).json({ error: `${err}` });
    }
  },

  // ====================================================================== //
  //
  // Fetches a single card by ID and returns it as JSON via the result
  // argument.
  //
  // ====================================================================== //
  details: async function (request, result, next) {
    try {
      // The validation needed on the input.
      const schema = joi.object({
        id: joi.string().required(),
      });

      // Validate using the validation scheme above.
      const { error, value } = schema.validate(request.params);
      if (error) {
        throw new Error(`Input validation failed, ${error}`);
      }

      const card = await Card.findById(value.id);
      if (!card) {
        throw new Error("Invalid card ID.");
      }

      result.json(card);
    } catch (err) {
      logError(err);
      result.status(400).json({ error: `${err}` });
    }
  },

  // ====================================================================== //
  //
  // Fetches all cards belonging to a user, returning it as JSON via the
  // result argument.
  //
  // ====================================================================== //
  userCards: async function (request, result, next) {
    try {
      // The validation needed on the input.
      const schema = joi.object({
        id: joi.string().required(),
      });

      // Validate using the validation scheme above.
      const { error, value } = schema.validate(request.params);
      if (error) {
        throw new Error(`Input validation failed, ${error}`);
      }

      const user = await User.findById(value.id);
      if (!user || !user.isBiz) {
        throw new Error("Invalid user or user is not a business.");
      }

      const cards = await Card.find({ user_id: user._id });
      result.json(cards);
    } catch (err) {
      logError(err);
      result.status(400).json({ error: `${err}` });
    }
  },

  // ====================================================================== //
  //
  // Adds a new card to the database belonging to a user. The newly added card
  // is then returned to the caller via the result argument.
  //
  // ====================================================================== //
  add: async function (request, result, next) {
    try {
      const user = await User.findOne({ email: request.token.email });
      if (!user) {
        throw new Error("User doesn't exist");
      }

      if (!user.isBiz) {
        throw new Error("User is not a business.");
      }

      const schema = joi.object({
        title: joi.string().min(2).max(256).required(),
        subTitle: joi.string().min(2).max(256).required(),
        address: joi.string().min(2).max(256).required(),
        phone: joi.string().min(9).max(14).required(),
        url: joi.string().min(6).max(1024),
        alt: joi.string().min(2).max(256),
      });

      const { error, value } = schema.validate(request.body);
      if (error) {
        throw new Error(`Input validation failed, ${error}`);
      }

      const card = new Card({
        title: value.title,
        subTitle: value.subTitle,
        address: value.address,
        phone: value.phone,
        image: {
          url: value.url
            ? value.url
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          alt: value.alt ? value.alt : "Pic of Business Card",
        },
        bizNumber: Math.floor(Math.random() * 10000000),
        user_id: user._id,
      });

      const newCard = await card.save();
      result.json(newCard);
    } catch (err) {
      logError(err);
      result.status(400).json({ error: `${err}` });
    }
  },

  // ====================================================================== //
  //
  // Updates a card's data in the database, returning the updated card as JSON
  // via the result argument.
  //
  // ====================================================================== //
  updateDetails: async function (request, result, next) {
    try {
      const user = await User.findOne({ email: request.token.email });
      if (!user || !user.isBiz) {
        throw new Error("User is not a business.");
      }

      const schema = joi
        .object({
          title: joi.string().min(2).max(256).required(),
          subTitle: joi.string().min(2).max(256).required(),
          address: joi.string().min(2).max(256).required(),
          phone: joi.string().min(9).max(14).required(),
          url: joi.string().min(6).max(1024),
          alt: joi.string().min(2).max(256),
        })
        .min(1);

      const { error, value } = schema.validate(request.body);
      if (error) {
        throw new Error(`Input validation failed, ${error}`);
      }

      const filter = {
        _id: request.params.id,
        userID: user._id,
      };
      const card = await Card.findOneAndUpdate(filter, value);
      if (!card) {
        throw new Error(`Failed to update card.`);
      }
      result.json(card);
    } catch (err) {
      logError(err);
      result.status(400).json({ error: `${err}` });
    }
  },

  // ====================================================================== //
  //
  // Deletes a card using its ID, returning the deleted card as JSON via the
  // result argument.
  //
  // ====================================================================== //
  delete: async function (request, result, next) {
    try {
      const user = await User.findOne({ email: request.token.email });
      if (!user || !user.isBiz) {
        throw new Error("User is not a business.");
      }

      const schema = joi.object({
        id: joi.string().required(),
      });

      const { error, value } = schema.validate(request.params);
      if (error) {
        throw new Error(`Input validation failed, ${error}`);
      }

      const deletedCard = await Card.findOneAndRemove({
        _id: value.id,
        user_id: user._id,
      });

      if (!deletedCard) {
        throw new Error(`Failed to delete card.`);
      }

      result.json(deletedCard);
    } catch (err) {
      logError(err);
      result.status(400).json({ error: `${err}` });
    }
  },
};
