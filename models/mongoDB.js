const mongoose = require("mongoose");

mongoose
  .connect(process.env.MongoDb_url)
  .then(() => {
    console.log("MongoDB is ready to use");
  })
  .catch((err) => {
    console.log(err);
  });
