module.exports = {
    PORT: 4001,
    COOKIEKEY: "lastservice",
    MONGODB_CONNECTION_STRING: "mongodb://ivinjose:testing123@ds031407.mlab.com:31407/last-service",
    GOOGLE: {
        clientID: "31031825381-oe81r9vkash6n3p6om73vnpc94qfrbeu.apps.googleusercontent.com",
        clientSecret: "tzQ3xvcjVp0jhVikde-iYleF",
        callbackURL: "http://localhost:4001/auth/google/callback"
    },
    FRONTEND_HOST: 'http://localhost:4000',
    JWT_PRIVATE_KEY: 'privatekey'
};
