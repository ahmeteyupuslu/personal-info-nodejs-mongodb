import { UserModel } from "../models/userModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const AddUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, tc, tel, email, password, isAdmin } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        errors: [{ msg: "User already exists" }],
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstName,
      lastName,
      tc,
      tel,
      email,
      password: hashPassword,
      isAdmin,
    });
    const result = await newUser.save();

    result._doc.password = undefined;
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        errors: [{ msg: "Geçersiz Mail veya Şifre" }],
      });
    }
    const isPasswordOk = await bcrypt.compare(password, userExist.password);
    console.log(isPasswordOk);
    if (!isPasswordOk) {
      return res.status(400).json({
        errors: [{ msg: "Geçersiz Mail veya Şifre" }],
      });
    }
    const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });

    const user = { ...userExist._doc, password: undefined };
    return res.status(201).json({ success: true, user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const Auth = (req, res) => {
  return res.status(200).json({ success: true, user: { ...req.user._doc } });
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    return res.status(400).json({ error: "User id is required" });
  }
  try {
    const user = await UserModel.findById({ _id: id });
    console.log(user);
    return res.status(200).json({ success: true, ...user._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
const editUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "User id is required" });
  }
  try {
    const result = await UserModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    console.log("result");
    console.log(result);
    console.log(result._doc);
    return res.status(200).json({ success: true, ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "ID belirtilmedi" });
  }
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({ error: "Kullanıcı bulunamadı" });
    }
    const deleteRecord = await UserModel.findByIdAndDelete({ _id: id });
    const users = await UserModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

/* const deleteAllUsersExceptLoggedIn = async (req, res) => {
  try {
    // Find the logged-in user
    const loggedInUser = req.user;
    console.log(loggedInUser);
    // Find all users except the logged-in user
         const usersToDelete = await UserModel.find({ _id: { $ne: loggedInUser._id } });

    // Delete all users except the logged-in user
    await UserModel.deleteMany({ _id: { $in: usersToDelete.map(user => user._id) } });
 
    return res.status(200).json({ success: true, message: "All users except the logged-in user have been deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}; */

export {
  AddUser,
  Login,
  Auth,
  getUsers,
  getUser,
  editUser,
  deleteUser
};
