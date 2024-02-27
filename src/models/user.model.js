const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "filed must be a valid email address"],
    },
    password: {
      type: String,
      required: true,
      validator: [validator.isStrongPassword, "password must be strong"],
    },
    tokens: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("User", userSchema);
