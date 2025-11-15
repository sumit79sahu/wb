
require('dotenv').config()
const { connect } = require("./config/db.js");
const { app } = require("./app.js");

connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
