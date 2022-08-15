import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Enter your first name."],
  },
  lastName: {
    type: String,
    required: [true, "Enter your last name."],
  },
  books: {
    type: Object,
  },
  email: {
    type: String,
    required: [true, "Enter your email."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter new password."],
    minlength: 8,
    select: false, // will not show password in any output
  },
});

// document middlewear
// bcrypt is good agains bruteforce
userSchema.pre("save", async function (next) {
  // Only run this function if password was modified
  if (!this.isModified("password")) return next();

  // Has the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
