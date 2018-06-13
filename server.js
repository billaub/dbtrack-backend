'use strict';

let express = require('express');
let bodyparser = require('body-parser');
let cors = require('cors');
let app = express();
let port = 8000;
let routes = require('./api/routes/routes');
let db = require('./api/models/index');
let user = require('./api/models/user');
let passport = require("passport");
let passportJWT = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
jwtOptions.secretOrKey = "dbtrack";

let strategy = new passportJWT(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    user.findOne({
        where: {id: jwt_payload.id}
    }).then((user) => {
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});

passport.use(strategy);

app.use(cors());
app.use(passport.initialize());
app.use(bodyparser.urlencoded({ extended : false}));
app.use(bodyparser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.use('/tracks', passport.authenticate('jwt', {session: false}));
app.use('/subscribe', passport.authenticate('jwt', {session: false}));
app.use('/subscriptions', passport.authenticate('jwt', {session: false}));

routes(app);
app.listen(port);

console.log("Dbtrack-backend up and running on port " + port.toString());