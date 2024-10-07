const express = require("express");
var bodyParser = require("body-parser");
const { dbConnect, sequelize } = require("./config/dbConnection");
const {ProfileModel} = require("./models/profileModels");
const {UserModel} = require("./models/users");
require("./association");
const app = express();

dbConnect();
(async () => {
  await sequelize.sync({force: false});
})();

app.use(bodyParser.json());

app.use("/", require("./routes/userRoutes"));

app.listen(8520, () => {
  console.log("server started");
});
