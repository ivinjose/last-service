const express = require( 'express' );
const webpack = require('webpack');
const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const constants = require("./src/server/constants");
const vehicleFunctions = require("./src/server/functions/vehicleFunctions");
const serviceFunctions = require("./src/server/functions/serviceFunctions");
const userFunctions = require("./src/server/functions/userFunctions");
const middlewares = require('./src/server/helpers/middlewares');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const isDev = process.argv[2] === 'dev';

/**
 * Use webpack dev middleware for local development
 */
if( isDev ){
    app.use(webpackDevMiddleware(webpack(webpackConfig), {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        stats: {
            colors: true,
        },
        historyApiFallback: true,
    }));
}

app.use(express.static('www'));
app.use(cookieParser(), bodyParser.json(), middlewares.setHeaders, middlewares.validateUserCookie);

/**
 * Connect to DB
 */
mongoose.connect(constants.MONGODB_CONNECTION_STRING, () => {
    console.log("connected to mongodob");
});

/**
 * APIs
 */
app.post("/api/signup", function(req, res) {
    userFunctions.signup(req).then((result)=>{
        res.status(200).send({ status: 'success', message: "Successfully created the user", data: result });
    }).catch(err =>{
        res.status(500).send({ status: 'error', message: "Could not create the user", meta: err || {} });
    });
});

app.post("/api/login", function(req, res) {
    userFunctions.login(req).then((result)=>{
        const token = jwt.sign(result._id.toString(), constants.JWT_PRIVATE_KEY)
        res.cookie('token', token);
        res.status(200).send({ status: 'success', message: "Successfully matched the user", data: result });
    }).catch(err =>{
        res.status(404).send({ status: 'error', message: "Could not find a matching user", meta: err || {} });
    });
});

app.get("/api/users/:id", userFunctions.getUser);

app.get("/api/users/:id/vehicles", vehicleFunctions.getVehiclesOfUser);

app.get("/api/users/:id/services", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        serviceFunctions.getServicesOfUser(req, res);
    } else {
        serviceFunctions.searchServicesOfUser(req, res);
    }
});

app.get("/api/vehicles/:id/services", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        serviceFunctions.getServicesOfVehicle(req, res);
    } else {
        serviceFunctions.searchServicesOfUser(req, res);
    }
});

app.post("/api/users/:id/vehicles", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        vehicleFunctions.addVehiclesOfUser(req, res);
    } else {
        serviceFunctions.searchServicesOfUser(req, res);
    }
});

app.post("/api/vehicles/:id", vehicleFunctions.addVehiclesOfUser);

app.put("/api/vehicles/:id", vehicleFunctions.updateVehicle);

// app.get("/api/services", serviceFunctions.getServices;

app.post("/api/vehicles/:id/service", serviceFunctions.addServices);

/**
 * Server the HTML for local development
 */
app.get('/*', (req,res) => {
	res.sendFile(path.join(__dirname, './www/index.html'))
});

app.listen(constants.PORT, () => {
    console.log("LastService listening on port " + constants.PORT);
});