const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, 
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      select: false, 
    },

    googleId: {
      type: String,
      index: true,
      sparse: true, 
    },

    profileImage: {
      type: String,
      default: "", 
    },

    bio: {
      type: String,
      trim: true,
      maxlength: [300, "Bio can't exceed 300 characters"],
      default: "",
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      required: true,
      default: "local",
    },
  },
  { timestamps: true }
);

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 
  this.password = await bcrypt.hash(this.password, 10); 
  next();
});


authSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", authSchema); 
module.exports = User;
