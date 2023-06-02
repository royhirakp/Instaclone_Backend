//CLUSTER
const cluster = require("cluster");
const os = require("os");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const app = require("./app");

// cluster added
if (cluster.isPrimary) {
  console.log("if condition");
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // connect mongoDb dataBase
  mongoose.connect(process.env.mongo).then(() => {
    console.log("DB connected");
  });
  // start the server
  app.listen(process.env.port, () => {
    console.log(`Server is up at ${process.env.port} `);
  });
}
