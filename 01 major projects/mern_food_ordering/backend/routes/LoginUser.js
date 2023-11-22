const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

router.post(
  "/loginuser",
  [
    body(
      "email",
      "not a valid/correct email, maybe '@' is not provided by you OR email do not exist in database!"
    ).isEmail(),
    body(
      "password",
      "Password must have length equal to 8 characters and must be strong."
    )
      .isLength({ min: 8 })
      .isStrongPassword(),
  ],
  async (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userDocument = await UserModel.findOne({ email });
      if (!userDocument) {
        return res.status(400).json({ errors: "Wrong Email!" });
      }

      // comparing hashed password with real password from database
      const pwdCompare = await bcrypt.compare(password, userDocument.password);

      if (!pwdCompare) {
        return res.status(400).json({ errors: "Wrong Password!" });
      }

      const data = {
        user: {
          id: userDocument.id,
        },
      };

      // JWT Token Generation Here 
      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
