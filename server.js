const express = require("express");
const server = express();
const config = require("config");
const mongoose = require("mongoose");
server.use(express.json({ extended: true }));
server.use('/api/auth', require('./routes/auth'));
server.use('/api/tasks', require('./routes/dayTasks'));
const PORT = config.get("port") || 5000;

server.listen(PORT, () => {
  console.log("Success");
});
async function connect() {
  try {
    await mongoose.connect(config.get("dbUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}
connect();
