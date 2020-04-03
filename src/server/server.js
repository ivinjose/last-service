const express = require( 'express' );
const app = express();
const constants = require("./constants");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const vehicleFunctions = require("./functions/vehicleFunctions");
const serviceFunctions = require("./functions/serviceFunctions");
const userFunctions = require("./functions/userFunctions");
const jwt = require('jsonwebtoken');
const middlewares = require('./helpers/middlewares');

app.use(cookieParser(), bodyParser.json(), middlewares.setHeaders, middlewares.validateUserCookie);

app.listen(constants.PORT, () => {
    console.log("LastService server listening on port " + constants.PORT);
});

mongoose.connect(constants.MONGODB_CONNECTION_STRING, () => {
    console.log("connected to mongodob");
});

/**
 * APIs
 */
app.post("/signup", function(req, res) {
    userFunctions.signup(req).then((result)=>{
        res.status(200).send({ status: 'success', message: "Successfully created the user", data: result });
    }).catch(err =>{
        res.status(500).send({ status: 'fail', message: "Could not create the user", meta: err || {} });
    });
});

app.post("/login", function(req, res) {
    userFunctions.login(req).then((result)=>{
        const token = jwt.sign(result._id.toString(), constants.JWT_PRIVATE_KEY)
        res.cookie('token', token);
        res.status(200).send({ status: 'success', message: "Successfully matched the user", data: result });
    }).catch(err =>{
        res.status(404).send({ status: 'fail', message: "Could not find a matching user", meta: err || {} });
    });
});

app.get("/users/:id", function(req, res) {
    userFunctions.getUser(req, res);
});

app.get("/users/:id/vehicles", function(req, res) {
    vehicleFunctions.getVehiclesOfUser(req, res);
});

app.get("/users/:id/services", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        serviceFunctions.getServicesOfUser(req, res);
    } else {
        serviceFunctions.searchServicesOfUser(req, res);
    }
});

app.get("/vehicles/:id/services", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        serviceFunctions.getServicesOfVehicle(req, res);
    } else {
        serviceFunctions.searchServicesOfUser(req, res);
    }
});

app.post("/users/:id/vehicles", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        vehicleFunctions.addVehiclesOfUser(req, res);
    } else {
        serviceFunctions.searchServicesOfUser(req, res);
    }
});

app.post("/vehicles/:id", function(req, res) {
    vehicleFunctions.addVehiclesOfUser(req, res);
});

app.put("/vehicles/:id", function(req, res) {
    vehicleFunctions.updateVehicle(req, res);
});

// app.get("/services", function(req, res) {
//     serviceFunctions.getServices(req, res);
// });

app.post("/vehicles/:id/service", function(req, res) {
    serviceFunctions.addServices(req, res);
});
