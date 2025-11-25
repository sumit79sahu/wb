const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    reset_password_token: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      first_name: this.first_name,
      last_name: this.last_name,
      _id: this._id,
      email: this.email,
    },
    process.env.SECERT_KEY,
    {
      expiresIn: "1y",
    }
  );
  return token;
};

userSchema.methods.generateResetPasswordLink = async function (url) {
  const token = crypto.randomBytes(20).toString("hex");
  this.reset_password_token = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  await this.save({ validateBeforeSave: true });
  return url + "/reset-password?token=" + token;
};

userSchema.methods.isPasswordCorrect = async function (pwd) {
  return await bcrypt.compare(pwd, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.password) return next();
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update.password) return next();
  const hashedPassword = await bcrypt.hash(update.password, 10);
  this.setUpdate({ ...update, password: hashedPassword });
  next();
});

module.exports = new model("User", userSchema);
