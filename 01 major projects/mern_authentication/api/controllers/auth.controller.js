const userModel = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error.js");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new userModel({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "new user created successfully" });
  } catch (err) {
    // res.status(500).json(err.message);

    // instead upper line of code,
    // use a middle ware in index.js to handle errors,
    next(err);
  }
};

module.exports = { signup };
