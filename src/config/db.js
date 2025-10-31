const mongoose = require("mongoose");

const connect = async function DatabaseConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://sumit79sahu_db_user:9weNSUdWBoo2pTp5@cluster0.ijtqmhk.mongodb.net/wb-database"
    );
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
  return;
};
module.exports = { connect };
