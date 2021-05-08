const mongoose = require("mongoose");

const uri = process.env.DB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error in connecting Database", err));

// FOR THE PR ISSUE, WILL CLEAN LATER
