const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  name: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  days: { type: Types.ObjectId, ref: "DayTasks" }
});
module.exports = model("User", schema);
