const ObjectId = require("mongodb").ObjectID;
const Vehicle = require("../models/vehicle-model");

module.exports = {
    /**
     * This function shouldnt be used, since it doesnt consider user.
     * Does a GET on all users' vehicles.
     */
    // getVehicles(req, res) {
    //     Vehicle.find({}, (err, result) => {
    //         if (err) {
    //             res.status(404).send({ message: "Could not fetch the vehicles", meta: err });
    //         } else {
    //             res.status(200).send({ message: "Successfully fetched the vehicles", data: result });
    //         }
    //     });
    // },

    getVehiclesOfUser(req, res) {
        Vehicle.find({ user: req.params.id }, (err, result) => {
            if (err) {
                res.status(404).send({ message: "Could not fetch the vehicles", meta: err });
            } else {
                res.status(200).send({ message: "Successfully fetched the vehicles", data: result });
            }
        });
    },

    addVehiclesOfUser(req, res) {
        const user = req.params.id || null;
        const data = [];
        //TODO: Error handling
        // 1: How to handle if UI valdiation is bypassed and req.body doesn't have name or vehicle type
        if(Array.isArray(req.body)){
            req.body.forEach((vehicle)=>{
                const vehicleData = {
                    name : vehicle.name || null, //is null to be pushed to DB?
                    type:  vehicle.type || "other",
                    registration: vehicle.registration || null,                    
                    user: user
                };
                data.push(vehicleData);
            });
        }
        else {
            const name = req.body.name || null;
            const type = req.body.type || "other" ;
            const registration = req.body.registration || null;
            const vehicleData = {
                name,
                type,
                registration,
                user
            };
            data.push(vehicleData);
        }

        Vehicle.insertMany(data, (err, result) => {
            if (err) {
                res.status(404).send({ message: "Could not save the vehicle", meta: err });
            } else {
                res.status(200).send({ message: "Successfully saved the vehicle", data: result });
            }
        });
    },

    updateVehicle(req, res) {
        var conditions = { _id: ObjectId(req.params.id) };
        var update = { $set: { name: req.body.name, type: req.body.type } };
        var options = { new: true };
        Vehicle.findOneAndUpdate(conditions, update, options, (err, result) => {
            if (err) {
                res.status(400).send({ message: "Could not update the vehicle", meta: err });
            } else {
                res.status(200).send({ message: "Successfully updated the vehicle", data: result });
            }
        });
    }
};
