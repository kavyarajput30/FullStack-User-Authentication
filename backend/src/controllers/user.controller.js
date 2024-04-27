import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponce from "../utils/ApiResponce.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: "password is required",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      error: "User not Found Check your Email and try again",
    });
  }

  const isPassValid = await user.isPasswordCorrect(password);

  if (!isPassValid) {
    return res.status(400).json({
      error: "Invalid Password Check your password and try again",
    });
  }

  const token = jwt.sign(
    { email: user.email, _id: user._id, name: user.name },
    process.env.JWT_SECRET,
    {},
    (err, token) => {
      if (err) {
        console.log(err);
      }
      res
        .cookie("token", token)
        .status(200)
        .json(new ApiResponce(200, "Login successful", user, true, false));
    }
  );
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);
  //  validation
  if (!email) {
    return res.status(400).json({
      error: "email is required",
    });
  }

  if (!password) {
    console.log(password);
    return res.status(400).json({
      error: "password is required",
    });
  }
  if (
    [name, email, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  //  check if user already exist: username, email
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    console.log(existedUser);
    return res.status(400).json({
      error: "User already exist",
    });
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    return res.status(400).json({
      error: "Error while creating User",
    });
  }
  console.log(user);

  return res
    .status(201)
    .json(new ApiResponce(201, "User created successfully", user, true, false));
});

const getProfile = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    res.status(200).json(user);
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      error: "Already Logged Out",
    });
  }
   
 return res.clearCookie("token").json({ success: true, message: "Logged Out Successfully" });
});
export { loginUser, registerUser, getProfile,logoutUser };
