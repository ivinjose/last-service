const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    vehicle: String,
    user: String,
    date: String,
    component: String,
    amount: String,
    comments: String
});

const Service = mongoose.model("service", serviceSchema);

module.exports = Service;
