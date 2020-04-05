const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    name: String,
    user: String,
    type: String
});

const Vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = Vehicle;
