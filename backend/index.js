const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3000;

/* Import route module file */
const routes = require("./routes/route");

app.use(
  cors({
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("*", (req, res) => {
//   res.send("Welcome to API.");
// });

/* Default endpoint path */
app.use("/api", routes);

/* Express Error handling middleware */
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const data = error.data;
  res.status(statusCode).json({
    message: error.message,
    status: statusCode,
    data: data,
  });
});

mongoose
  .connect(process.env.MONGODB_SERVER_KEY)
  .then((result) => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log("Backend Server started");
    });
  })
  .catch((err) => console.log(err));
