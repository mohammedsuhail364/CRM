const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: String,
    profileImage: {
      type: String,
      default: "",
    },
    role: { type: String, default: "user" },
    totalTickets: { type: Number, default: 0 },
    tickets: { type: Object, default: {} },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", UserSchema);
