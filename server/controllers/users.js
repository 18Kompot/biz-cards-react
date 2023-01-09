const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");
const joi = require("joi");
const bcrypt = require("bcrypt");

// ========================================================================== //
//
// logging function. Used by all functions in this module.
//
// ========================================================================== //
function logError(error) {
  console.log(`Server error in users controller: ${error}`);
}

module.exports = {
  // ====================================================================== //
  //
  // Attempts to log the user in.
  //
  // ====================================================================== //
  login: async function (request, result, next) {
    try {
      // Request input validation.
      const schema = joi.object({
        email: joi.string().required().min(6).max(256).email(),
        password: joi.string().required().min(6).max(1024),
      });

      const { error, value } = schema.validate(request.body);
      if (error) {
        throw new Error(`Input validation failed, ${error}`);
      }

      // Fetch the user.
      const user = await User.findOne({ email: value.email });
      if (!user) {
        throw new Error("Failed to find user.");
      }

      // Check if the input password is correct.
      const isPasswordCorrect = await bcrypt.compare(
        value.password,
        user.password
      );
      if (!isPasswordCorrect) {
        throw new Error("Invalid password.");
      }

      const param = { email: value.email };
      const token = jwt.sign(param, config.jwt_token, { expiresIn: "72800s" });

      result.json({
        token: token,
        id: user._id,
        email: user.email,
        name: user.name,
        isBiz: user.isBiz,
      });
    } catch (err) {
      logError(err);
      result.status(401).json({ error: `${err}` });
    }
  },

  // ====================================================================== //
  //
  // Attempts to sign up a new user.
  //
  // ====================================================================== //
  signup: async function (request, result, next) {
    try {
      // Request input validation.
      const schema = joi.object({
        email: joi.string().min(6).max(256).required().email(),
        password: joi.string().min(6).max(1024).required(),
        name: joi.string().required().min(2).max(256),
        isBiz: joi.boolean(),
      });

      const { error, value } = schema.validate(request.body);
      if (error) {
        throw new Error(`Input validation failed, ${error}`);
      }

      // Check to see if a user already exists with the form's email.
      const user = await User.findOne({ email: value.email });
      if (user) {
        throw new Error("User already exists.");
      }

      // Create the new user.
      const hash = await bcrypt.hash(value.password, 10);
      const newUser = new User({
        email: value.email,
        password: hash,
        name: value.name,
        isBiz: value.isBiz,
      });
      await newUser.save();

      // Mark the operation as successful by setting the result JSON to
      // the new user's mongoose document object.
      result.json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isBiz: newUser.isBiz,
      });
    } catch (err) {
      logError(err);
      result.status(400).json({ error: `${err}` });
    }
  },

  // ====================================================================== //
  //
  // Fetches a user by ID, returning the user as JSON via the result argument.
  //
  // ====================================================================== //
  details: async function (request, result, next) {
    try {
      // Request input validation.
      const schema = joi.object({
        id: joi.string().required(),
      });

      const { error, value } = schema.validate(request.params);
      if (error) {
        throw new Error(`Input validation failed, ${error.details[0].message}`);
      }

      // Fetch the user using the input ID.
      const user = await User.findById(value.id);
      if (!user) {
        throw new Error("User does not exist.");
      }

      result.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isBiz: user.isBiz,
      });
    } catch (err) {
      logError(err);
      result.status(400).json({ error: `${err}` });
    }
  },
};
