const constants = require("../constants");
const jwt = require('jsonwebtoken');
const userFunctions = require("../functions/userFunctions");

const setHeaders = (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
};

const validateUserCookie = (req, res, next) => {
    if( req.method == 'OPTIONS' || req.path == '/api/login' || req.path == '/api/signup' ){
        next();
        return;
    }
    const { cookies: { token } } = req;

    if( token ){
        jwt.verify(token, constants.JWT_PRIVATE_KEY, function(err, decodedToken){
            if( err ){
                res.status(401).send('Unauthorized access');
                return;
            }

            if( decodedToken ){
                userFunctions.isValidUser(decodedToken).then( result => {
                    if( result ){
                        next();
                        return;
                    }else{
                        res.status(401).send('Unauthorized access. Please login.');
                    }
                }).catch(error => {
                    res.status(401).send('Unauthorized access. Please login.');
                })
            }else{
                res.status(401).send('Unauthorized access. Please login.');
            }
        });
    }else{
        res.status(401).send('Unauthorized access. Please login.');
    }
}

module.exports = { setHeaders, validateUserCookie };