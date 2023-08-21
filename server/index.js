const express = require("express");
const app = express();
const PORT = 3005;
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();


//Middleware to format body into JSON
app.use(require("body-parser").json());

//Middleware for logging
app.use(require("morgan")("dev"));

app.use((req, res, next) => {
  //Check if the authorization header is valid
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  try{
    const { id } = jwt.verify(token, process.env.JWT);
    req.userId = id;
  }
  catch{
    req.userId = null;
  }

  next();
});

//Middleware to serve static files
app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
});

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is up and running and listening on port ${PORT}`);
  } else {
    console.log(`Something went wrong`);
  }
});
