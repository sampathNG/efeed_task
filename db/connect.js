const connectionSting = require("../config");
const mongoose = require("mongoose");

async function connect() {
  try {
    const databaseUrl = connectionSting;
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Connection error:", error.message);
  }
}
// connect();
module.exports = connect();
