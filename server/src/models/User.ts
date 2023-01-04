import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      min: 2,
      max: 11,
      unique: true
    },
    pass: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    color: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
