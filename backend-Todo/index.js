require("dotenv").config();
const express = require("express");
const  mongoose  = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))

const mongoOptions = { maxPoolSize: 20 };
let isConnected = false;

const connectToMongoDB = async () => {
  if (!isConnected) {
    try {
      const mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.b9qeg0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
      await mongoose.connect(mongoUri, mongoOptions);
      isConnected = true;
      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.log("❌ MongoDB Error:", error.message);
      throw error;
    }
  }
};

app.use(async (_, res, next) => {
  try {
    await connectToMongoDB();
    next();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Routes
app.use("/api", routes);



// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
