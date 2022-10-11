const express = require("express");
const cors = require("cors");
const router = require("./routes");
const AppError = require("./helpers/appError");
const errorHandler = require("./helpers/errorHandler");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

/* Allowing the server to accept requests from other domains. */
app.use(cors());

app.use(router);



app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
