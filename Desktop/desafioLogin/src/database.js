const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(``)
  .then(() => console.log("Connected database"))
  .catch((error) => console.error("Error Establishing a Database Connection", error))