const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
const path = require("path");

//routes path
const authRoutes = require("./routes/authRoute");

//dotenv
dotenv.config();

// mongo connection
connectDB();

// rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/*splat", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

//listen server
app.listen(PORT, () => {
  // console.log(
  //   `Server Running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan
  //     .white
  // );
});
