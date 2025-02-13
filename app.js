const express = require("express");
const bodyParser = require("body-parser");
const gamesRoutes = require("./routes/games-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const app = express();

app.use(bodyParser.json());

app.use("/api/games", gamesRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const err = new HttpError("Could not find this route.", 404);
  throw err;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500).json({
    message: err.message || "An unknown error occurred!",
  });
});

app.listen(5000);
