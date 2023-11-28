const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");

router.post(
  "/signup",
  [
    body("name", "Name must be alphabets only").isAlpha(),
    body(
      "email",
      "not a valid email, maybe '@' is not provided by you"
    ).isEmail(),
    body(
      "password",
      "password must be of 8 characters and must include mixture of lowercase, uppercase, special keyowords like '/', '#', '$', '_', '!'."
    )
      .isLength({ min: 4 })
      // .isStrongPassword(),
  ],
  async (req, res) => {
    const body = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // securing password here
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(body.password, salt);

    try {
      await UserModel.create({
        name: body.name,
        location: body.location,
        email: body.email,
        password: secPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
