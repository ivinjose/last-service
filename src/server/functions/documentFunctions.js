const Document = require("../models/document-model");
const sanitize = require("mongo-sanitize");

module.exports = {
    // /**
    //  * This function shouldnt be used, since it doesnt consider user.
    //  * Does a GET on all users' document.
    //  */
    // getDocuments(req, res) {
    //     Document.find({}, (err, result) => {
    //         if (err) {
    //             res.status(404).send({ status: 'error', message: "Could not fetch the documents", meta: err });
    //         } else {
    //             res.status(200).send({ status: 'success', message: "Successfully fetched the documents", data: result });
    //         }
    //     });
    // },

    searchDocumentsOfUser(req, res) {
        let optionalQueries = [];

        if (req.query.documentType) {
            optionalQueries.push({ documentType: { $regex: new RegExp(sanitize(req.query.documentType), "i") } });
        }
        if (req.query.renewalDate) {
            optionalQueries.push({ renewalDate: { $regex: new RegExp(sanitize(req.query.renewalDate), "i") } });
        }
        if (req.query.reminderDate) {
            optionalQueries.push({ reminderDate: { $regex: new RegExp(sanitize(req.query.reminderDate), "i") } });
        }
        if (req.query.comment) {
            optionalQueries.push({ comments: { $regex: new RegExp(sanitize(req.query.comment), "i") } });
        }

        Document.find(
            {
                $and: [
                    { user: req.params.id },
                    {
                        $or: optionalQueries
                    }
                ]
            },
            (err, result) => {
                if (err) {
                    res.status(404).send({ status: 'error', message: "Could not fetch the documents", meta: err });
                } else {
                    res.status(200).send({ status: 'success', message: "Successfully fetched the documents", data: result });
                }
            }
        );
    },

    getDocumentsOfUser(req, res) {
        Document.find({ user: req.params.id }, (err, result) => {
            if (err) {
                res.status(404).send({ status: 'error', message: "Could not fetch the documents", meta: err });
            } else {
                res.status(200).send({ status: 'success', message: "Successfully fetched the documents", data: result });
            }
        })
        .populate({ path: 'user', model: 'user', select: 'name' })
        .populate({ path: 'vehicle', model: 'vehicle', select: 'name' });
    },

    getDocumentsOfVehicle(req, res) {
        Document.find({ vehicle: req.params.id }, (err, result) => {
            if (err) {
                res.status(404).send({ status: 'error', message: "Could not fetch the documents", meta: err });
            } else {
                res.status(200).send({ status: 'success', message: "Successfully fetched the documents", data: result });
            }
        }) 
        .populate({ path: 'user', model: 'user', select: 'name' })
        .populate({ path: 'vehicle', model: 'vehicle', select: 'name' });
    },

    addDocument(req, res) {
        Document.insertMany(req.body, (err, result) => {
            if (err) {
                res.status(404).send({ status: 'error', message: "Could not save the document", meta: err });
            } else {
                res.status(200).send({ status: 'success', message: "Successfully saved the document", data: result });
            }
        });
    }
};
