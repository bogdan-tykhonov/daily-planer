const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post(
  "/register",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password should be at least 6 symbols").isLength({
      min: 6,
    }),
    check("name", "Name should be at least 2 symbols").isLength({
      min: 2,
    }),
  ],
  async (request, response) => {
    try {
        const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ error: true, message: errors.array()[0].msg});
      }
      const { email, password, name } = request.body;
      const validateUserEmail = await User.findOne({ email });
      const validateUserName = await User.findOne({ name });
      if (validateUserEmail) {
        return response
          .status(400)
          .json({
            error: true,
            message: "User with this email has already exists",
          });
      }
      if (validateUserName) {
        return response
          .status(400)
          .json({
            error: true,
            message: "User with this name has already exists",
          });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      return response
        .status(201)
        .json({created:true, message: "New user has successfuly created" });
    } catch (e) {
      response.status(500).json({ error:true, message: "Something goes wrong, try again" });
    }
  }
);

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const validateUser = await User.findOne({ email });
    if (!validateUser) {
      return response
        .status(400)
        .json({ error: true, message: "Can not find user with this email" });
    }
    const passIsIdentical = await bcrypt.compare(
      password,
      validateUser.password
    );
    console.log(passIsIdentical);
    if (!passIsIdentical) {
      return response
        .status(400)
        .json({ error: true, message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: validateUser.id, userMail: validateUser.email },
      config.get("secretKey"),
      { expiresIn: "1h" }
    );
    return response.json({ resolve:true ,token, userId: validateUser.id });
  } catch (e) {
    return response
      .status(500)
      .json({error: true, message: "Something goes wrong, try again" });
  }
});
module.exports = router;
