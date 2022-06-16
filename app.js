const express = require("express");
const app = express();
require("./src/route/index")(app);

app.listen(3000);
module.exports = app;
