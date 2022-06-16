const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const bcrypt = require("bcryptjs");

passport.use(
    "local",
    new LocalStrategy(
        {
            usernameField: "UserName",
            passwordField: "Password",
        },
        async function (username, password, done) {
            const user = await User.findOne({ where: { UserName: username } });
            if (!user) {
                return done(null, false, {
                    message: "Username does not existed",
                });
            }
            let match = await bcrypt.compare(password, user.Password);
            if (!match) {
                return done(null, false, {
                    message: "Password is not correct",
                });
            }
            return done(null, user);
        }
    )
);
