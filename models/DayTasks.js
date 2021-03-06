const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    daysTasks: {type: Array, required: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('DayTasks', schema);