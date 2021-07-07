import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const singUp = async (req, res) => {
  const { username, email, password, roles } = req.body;
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  console.log(savedUser);
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 8640, //24 hours
  });
  res.status(200).json({ token });
};

export const singIn = async (req, res) => {
  // Iniciar Con usuarios o Email
  let validar = {};
  const { email, username } = req.body;
  if (email !== "") {
    validar = { email };
  } else {
    validar = { username };
  }

  const userFound = await User.findOne(validar).populate("roles");

  if (!userFound) return res.status(400).json({ message: "User not Found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res
      .status(400)
      .json({ token: null, message: "The password is not Correct" });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400, // 24 hours
  });

  console.log(userFound);
  res.json({ token });
};
