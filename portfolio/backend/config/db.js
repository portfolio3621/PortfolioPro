const mongoose = require("mongoose");

exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((con) =>
      console.log(`Connected to Mongodb on ${con.connection.host}`)
    )
    .catch((err) =>
      console.error(`Could not connect to Mongodb :`, err.message)
    );
};
