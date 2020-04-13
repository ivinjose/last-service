const Service = require("../models/service-model");
const sanitize = require("mongo-sanitize");

module.exports = {
    /**
     * This function shouldnt be used, since it doesnt consider user.
     * Does a GET on all users' services.
     */
    getServices(req, res) {
        Service.find({}, (err, result) => {
            if (err) {
                res.status(404).send({ status: 'error', message: "Could not fetch the services", meta: err });
            } else {
                res.status(200).send({ status: 'success', message: "Successfully fetched the services", data: result });
            }
        });
    },

    searchServicesOfUser(req, res) {
        let optionalQueries = [];

        if (req.query.vehicle) {
            optionalQueries.push({ vehicle: { $regex: new RegExp(sanitize(req.query.vehicle), "i") } });
        }
        if (req.query.component) {
            optionalQueries.push({ component: { $regex: new RegExp(sanitize(req.query.component), "i") } });
        }
        if (req.query.amount) {
            optionalQueries.push({ amount: { $regex: new RegExp(sanitize(req.query.amount), "i") } });
        }
        if (req.query.comments) {
            optionalQueries.push({ comments: { $regex: new RegExp(sanitize(req.query.comments), "i") } });
        }

        Service.find(
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
                    res.status(404).send({ status: 'error', message: "Could not fetch the services", meta: err });
                } else {
                    res.status(200).send({ status: 'success', message: "Successfully fetched the services", data: result });
                }
            }
        );
    },

    getServicesOfUser(req, res) {
        Service.find({ user: req.params.id }, (err, result) => {
            if (err) {
                res.status(404).send({ status: 'error', message: "Could not fetch the services", meta: err });
            } else {
                res.status(200).send({ status: 'success', message: "Successfully fetched the services", data: result });
            }
        });
    },

    getServicesOfVehicle(req, res) {
        Service.find({ vehicle: req.params.id }, (err, result) => {
            if (err) {
                res.status(404).send({ status: 'error', message: "Could not fetch the services", meta: err });
            } else {
                res.status(200).send({ status: 'success', message: "Successfully fetched the services", data: result });
            }
        });
    },

    addServices(req, res) {
        Service.insertMany(req.body, (err, result) => {
            if (err) {
                res.status(404).send({ status: 'error', message: "Could not save the service", meta: err });
            } else {
                res.status(200).send({ status: 'success', message: "Successfully saved the service", data: result });
            }
        });
    }
};
