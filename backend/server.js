const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// Routes
app.use("/api/equipment", require("./routes/equipmentRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
