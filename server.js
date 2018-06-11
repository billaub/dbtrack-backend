'use strict';

let express = require('express');
let bodyparser = require('body-parser');
let app = express();
let port = 8000;
let routes = require('./api/routes/routes');
let db = require('./api/models');
let passport = require("passport");
let passportJWT = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
jwtOptions.secretOrKey = "dbtrack";

db.sequelize.sync()
    .then(() => console.log("ok"))
    .catch((err) => console.log(err));

let strategy = new passportJWT(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = db.user.findOne({
        where: {id: jwt_payload.id}
    });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

app.use(passport.initialize());
app.use(bodyparser.urlencoded({ extended : false}));
app.use(bodyparser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
routes(app);
app.listen(port);

console.log("Dbtrack-backend up and running on port " + port.toString());