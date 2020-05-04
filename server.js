const express = require( 'express' );
const webpack = require('webpack');
const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const constants = require("./src/server/constants");
const userFunctions = require("./src/server/functions/userFunctions");
const vehicleFunctions = require("./src/server/functions/vehicleFunctions");
const serviceFunctions = require("./src/server/functions/serviceFunctions");
const documentFunctions = require("./src/server/functions/documentFunctions");
const middlewares = require('./src/server/helpers/middlewares');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const isDev = process.argv[2] === 'dev';
const compiler = webpack(webpackConfig);

/**
 * Use webpack dev middleware for local development
 */
if( isDev ){
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        stats: {
            colors: true,
        },
        historyApiFallback: true,
    }));
    app.use(require("webpack-hot-middleware")(compiler));
}

app.use(express.static('www'));
app.use(cookieParser(), bodyParser.json(), middlewares.setHeaders, middlewares.validateUserCookie);

/** Connect to DB */
mongoose.connect(constants.MONGODB_CONNECTION_STRING, () => {
    console.log("connected to mongodob");
});


/** USER APIs */
/** Signup  */
app.post("/api/signup", function(req, res) {
    userFunctions.signup(req).then((result)=>{
        res.status(200).send({ status: 'success', message: "Successfully created the user", data: result });
    }).catch(err =>{
        res.status(500).send({ status: 'error', message: "Could not create the user", meta: err || {} });
    });
});

/** Login */
app.post("/api/login", function(req, res) {
    userFunctions.login(req).then((result)=>{
        const token = jwt.sign(result._id.toString(), constants.JWT_PRIVATE_KEY)
        res.cookie('token', token);
        res.status(200).send({ status: 'success', message: "Successfully matched the user", data: result });
    }).catch(err =>{
        res.status(404).send({ status: 'error', message: "Could not find a matching user", meta: err || {} });
    });
});

/** Get user details */
app.get("/api/users/:id", userFunctions.getUser);



/** VEHICLE APIs  */
/** Add vehicles of a user */
app.post("/api/users/:id/vehicles", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        vehicleFunctions.addVehiclesOfUser(req, res);
    } else {
        serviceFunctions.searchServicesOfUser(req, res);
    }
});

/** Get vehicles of a user */
app.get("/api/users/:id/vehicles", vehicleFunctions.getVehiclesOfUser);

/** Update vehicles of a user */
app.put("/api/vehicles/:id", vehicleFunctions.updateVehicle);

//app.post("/api/vehicles/:id", vehicleFunctions.addVehiclesOfUser);



/** SERVICE APIs  */
/** Get services of a user */
app.get("/api/users/:id/services", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        serviceFunctions.getServicesOfUser(req, res);
    } else {
        serviceFunctions.searchServicesOfUser(req, res);
    }
});

/** Get services of a vehicle */
app.get("/api/vehicles/:id/services", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        serviceFunctions.getServicesOfVehicle(req, res);
    } else {
        serviceFunctions.searchServicesOfUser(req, res);
    }
});

/** Add services of a vehicle */
app.post("/api/vehicles/:id/service", serviceFunctions.addServices);



/** DOCUMENT APIs  */
/** Get documents of a user */
app.get("/api/users/:id/documents", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        documentFunctions.getDocumentsOfUser(req, res);
    } else {
        documentFunctions.searchDocumentsOfUser(req, res);
    }
});

/** Get documents of a vehicle */
app.get("/api/vehicles/:id/documents", function(req, res) {
    if (Object.keys(req.query).length === 0) {
        documentFunctions.getDocumentsOfVehicle(req, res);
    } else {
        documentFunctions.searchDocumentsOfUser(req, res);
    }
});

/** Add documents of a user */
app.post("/api/users/:id/document", documentFunctions.addDocument);


/** Serve the HTML for local development */
app.get('/*', (req,res) => {
	res.sendFile(path.join(__dirname, './www/index.html'))
});

app.listen(constants.PORT, () => {
    console.log("LastService listening on port " + constants.PORT);
});