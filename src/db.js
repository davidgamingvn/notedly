const mongoose = require("mongoose");

DB_HOST = "mongodb://localhost:27017/notedly";

module.exports = {
  connect: (DB_HOST) => {
    mongoose.connect(DB_HOST);
    mongoose.connection.on("error", (err) => {
      console.error(err);
      console.log("MongoDB connection error");
      process.exit();
    });
  },

  close: () => {
    mongoose.connection.close();
  },
};
