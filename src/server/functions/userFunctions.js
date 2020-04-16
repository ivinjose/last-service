const User = require("../models/user-model");
const ObjectId = require("mongodb").ObjectID;

module.exports = {

    signup(req){        
        return new Promise( resolve => {
            var userDetails = req.body.userDetails || {};
            var newUser = new User(userDetails);
            newUser.save((err, book) => {
                if(err){
                    reject(err);
                }else{
                    resolve(book._id);
                }
            })
        });
    },

    isValidUser(userId){
        return new Promise( resolve => {
            User.findOne({ _id: ObjectId(userId) }, (err, result) => {
                if( result && result._id ){
                    resolve(true);
                }else{
                    resolve(false);
                }
            });
        });
    },

    getUser(req, res) {
        User.findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
            if (err) {
                res.status(400).send({ status: 'error', message: "Could not fetch the user", meta: err });
            } else {
                res.status(200).send({ status: 'success', message: "Successfully fetched the user", data: result });
            }
        });
    },

    login(req){
        return new Promise((resolve, reject)=>{
            User.findOne({ username: req.body.username, password: req.body.password }, (err, result) => {
                if (err || !result) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }
};
