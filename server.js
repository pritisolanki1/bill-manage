const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// app.use(express.static(_dirname +'/dist'));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./src/app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
app.use(express.static(__dirname + '/dist/Angular8ClientCrud'));

// simple route
app.get("/", (req, res) => {
  
  res.json({ message: "Welcome to bezkoder application." });
  res.sendFile(path.join(__dirname+'/dist/Angular8ClientCrud/index.html'));
});
  
require("./src/app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
