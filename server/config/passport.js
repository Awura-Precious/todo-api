var passport = require("passport");
const { getRepository } = require("typeorm");
var LocalStrategy = require("passport-local").Strategy;
// var userSchema = require("../entity/users.entity");
// var User = getRepository(userSchema);
var userSchema = require("../entity/users.entity");
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// // sign in
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      req.checkBody("email", "Invalid email").notEmpty().isEmail();
      req.checkBody("password", "Invalid password").notEmpty();
      var errors = req.validationErrors();
      console.log(errors);
      if (errors) {
        var messages = [];

        errors.forEach(function (error) {
          messages.push(error.msg);
        });
        return done(null, false, messages);
      }

      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, "No user found.");
        }
        if (!user.validPassword(password)) {
          return done(null, false, "wrong password.");
        }
        if (req.body.user == "staff" && !user.isStaff) {
          return done(null, false, "Permission denied!");
        }
        if (req.body.user == "client" && user.isStaff) {
          return done(null, false, "Permission denied!");
        }
        return done(null, user);
      });
    }
  )
);
