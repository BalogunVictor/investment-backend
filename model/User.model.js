import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  date: Date,
});

export const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: [true, "Username Exist"],
  },
  phoneNumber: { type: String },
  jobTitle: { type: String },
  role: { type: String },
  deposit: { type: Number },
  total: { type: Number },
  status: { type: String },
  transaction: [TransactionSchema],
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);
