const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    user: String,
    vehicle: String,
    documentType: String,
    renewalDate: String,
    reminderDate: String,
    comment: String
});

const Document = mongoose.model("document", documentSchema);

module.exports = Document;
