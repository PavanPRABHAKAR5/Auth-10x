const express = require("express");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const route = express.Router();
const secretKey="heythisissecretkey"
route.use(express.json());
route.use(cors());

const user = require("../Model/User");



route.post("/", async (req, res) => {
  try {
     console.log(req.body);

    const {email,password,cpass}=req.body;
    const data= new user({email,password,cpass});

    await data.save()
    res.status(200).json({
      status: "success",
      data: data,
      message:"Registered Successfully"
    });
  } catch (e) {
    res.status(404).json({
      status: "Failed",
      message: "User Already Exist",
    });
  }
});


route.get("/", async (req, res) => {
  try {
    const data = await user.find();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (e) {
    res.status(404).json({
      status: "Failed",
      message: e.message,
    });
  }
});


route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await user.findOne({ email: email });
    console.log(login)
    if (!login) {
      res.json({
        message: "Invalid email",
      });
    } else {
      const isMatch= await bcrypt.compare(password,login.password)
      if (isMatch) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            user: login._id,
          } , secretKey
        );

        return res.status(200).json({
         message: "Logged In Successfully",
          token:token,
          login
        });
      } else {
        res.json({
          message: "Invalid password",
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = route;
