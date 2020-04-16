const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    vehicle: String,
    user: String,
    date: String,
    component: String,
    amount: String,
    comment: String
});

const Service = mongoose.model("service", serviceSchema);

module.exports = Service;
