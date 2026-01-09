const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DB;

mongoose.connect(DB).then((e) => console.log("DB connection successful!"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
