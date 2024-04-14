const bcrypt = require("bcrypt");
const { User } = require("../model/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPass,
    });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(501).json({ err: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid email or password");
    }
    const token = jwt.sign(
      { _id: user._id, email: email },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(501).json({ err: err.message });
  }
};

module.exports = {
  register,
  login,
};
