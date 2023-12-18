const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Payload Missing" });
    }
    const foundUser = await User.findOne({
      where: {
        email,
      },
    });
    if (foundUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    let newUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role_id: 1,
    };
    const createdUser = await User.create(newUser);
    if (!createdUser) {
      return res.status(400).json({ message: "Error creating User" });
    }
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
