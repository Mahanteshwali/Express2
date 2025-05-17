const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // assuming frontend runs on 3000
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Atlas Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://mahanteshDB:Mahanteshwali0809@reactexpress.yivbdmd.mongodb.net/?retryWrites=true&w=majority&appName=ReactExpress";

if (!MONGODB_URI) {
  console.error("❌ MongoDB URI not found in environment variables");
  process.exit(1); // Exit the app if Mongo URI is not set
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB Atlas connection error:", err.message);
    process.exit(1);
  });

// Routes
const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes);

const cartRoutes = require("./routes/cart"); // renamed for clarity
app.use("/api/foods", cartRoutes);

const userRoutes = require("./routes/UserCart");
app.use("/api/users", userRoutes);

const reviewRoutes = require("./routes/ReviewCart");
app.use("/api/reviews", reviewRoutes);

app.get('/favicon.ico', (req, res) => res.status(204));


// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use('/api/reviews/_logs', (req, res) => {
  res.status(404).send('Not found');
});


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
