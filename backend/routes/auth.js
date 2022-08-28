const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "hihellohowareyou";
//ROUTE 1: create a user using : POST "/api/auth/createuser". Dosen't require login
router.post(
  "/createuser",
  [
    //adding some checks on the attributes of user
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5 }),
  ],

  //if there are errors return bad request and the erros
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check wether the user with same email already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      //creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);

      //showing that user in result
      //res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Interval server error!");
    }
  }
);

//ROUTE 2: authenticate a user using : POST "/api/auth/login". Dosen't require login
router.post(
  "/login",
  [
    //adding some checks on the attributes of user
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],

  //if there are errors return bad request and t he erros
  async (req, res) => {
    //check for errors in attributes
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Please try again the username or password is inccorect!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Please try again the username or password is inccorect!" });
      }

      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken: authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Interval server error!");
    }
  }
);

//ROUTE 3: get loggedin user details : POST "/api/auth/getuser". Do require login
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user;
    const user = await User.findOne(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Interval server error!");
  }
});
module.exports = router;
