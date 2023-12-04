const userModel = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await userModel.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Email Not Found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // _doc means it is raw javascript object which is mongoDB document with no additional mongoose methods and data, bcuz mongoose attaches additonal information and methods to retrieved documents from mongoDB.
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    
    // httpOnly:true option makes the cookie accessible only on the server side
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ rest });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin };
