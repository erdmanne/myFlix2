const express = require("express"),
  morgan = require("morgan");
const path = require("path");
//Import should always be at the topmost part of the file

const app = express();

app.use(morgan("common"));

app.use(express.static(path.resolve(__dirname, "./public")));
app.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname, "./public/documentation.html"));
});
app.get("/api/movies", function(req, res) {
  res.send("Welcome to myFlix.");
});

//for serving the static files - in this case documentation.html

//error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//listen to port 8080
app.listen(8000, function() {
  console.log("Listen to port 8080");
});
