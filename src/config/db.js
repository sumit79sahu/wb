const mongoose = require("mongoose");

const connect = async function DatabaseConnection() {
  try {
    await mongoose.connect(
    process.env.CONNECTION_STRING
    );
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
  return;
};
module.exports = { connect };
