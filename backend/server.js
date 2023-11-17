require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// express app 👇
const app = express();

// middleware
app.use(cors());
app.use(express.json()); // 👈 récupère les données du corps d'une requête HTTP && les rends exploitables

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests ONCE connected to db
    app.listen(process.env.PORT, () => {
      console.log("Connected to db && listening on", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
