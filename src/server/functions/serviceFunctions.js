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
        })
        .populate({ path: 'user', model: 'user', select: 'name' })
        .populate({ path: 'vehicle', model: 'vehicle', select: 'name' });
    },

    getServicesOfVehicle(req, res) {
        Service.find({ vehicle: req.params.id }, (err, result) => {
            if (err) {
                res.status(404).send({ status: 'error', message: "Could not fetch the services", meta: err });
            } else {
                res.status(200).send({ status: 'success', message: "Successfully fetched the services", data: result });
            }
        })
        .populate({ path: 'user', model: 'user', select: 'name' })
        .populate({ path: 'vehicle', model: 'vehicle', select: 'name' });
    },

    addServices(req, res) {
        //TODO::Try to populate the result of the insertMany operation
        // req.body = {
        //     "user": "5a86de0b90d792bccf3c3404",
        //     "vehicle": "5e9b3bf786f6960d67de2809",
        //     "date": "2020-02-06",
        //     "component": "break-fluid",
        //     "amount": "160",
        //     "comment": "From HSR layout, 27th main service shop"
        // };

        Service.insertMany(req.body, (err, result) => {
            if (err) {
                res.status(404).send({ status: 'error', message: "Could not save the service", meta: err });
            } else {
                res.status(200).send({ status: 'success', message: "Successfully saved the service", data: result });
            }
        });
    }
};
