import { promisify } from "util";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN,
    httpOnly: true, // cookie can not be accessed or modified by the browser
  };

  res.cookie("jwt", token, cookieOptions);

  // Will not show password when user is created
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = async (req, res) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    // passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password"); // to show password

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If all is okay, send token to client
  createSendToken(user, 200, res);
};

export const logout = async (req, res) => {

  const token = req.cookies.jwt;
  if(token) {
    res.clearCookie("jwt")
    res.send({message: "Logging out, see you later"})
  }
}

// Function to protect rescources
export const protect = async (req, res, next) => {
  // 1) Check if token exists
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send();
  }

  // 2) Verification token - token expired -  did someone alter the data
  // loging decoded shows correct user id + dates, will suggest the payload is correct
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3) Look up the user
  const currentUser = await User.findById(decoded.id);

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};
