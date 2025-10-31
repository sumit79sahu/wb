const { connect } = require("./config/db.js");
const { app } = require("./app.js");

connect()
  .then(() => {
    app.listen(7777, () => {
      console.log("http://localhost:7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });
