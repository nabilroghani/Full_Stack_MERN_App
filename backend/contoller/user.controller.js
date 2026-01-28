const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email or username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid Credential");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      message: "user login succesfully...",
      token: token,
    });
  } catch (error) {
    res.status(500).send("login user error");
  }
};

const getUser = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username param required" });
    }

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Get user error" });
  }
};

module.exports = { registerUser, loginUser, getUser };
