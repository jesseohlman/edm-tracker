const User = require("../db/models").User;
const userQueries = require("../db/user.queries");
const passport = require("passport");


module.exports = {
    create(req, res, next){
        userQueries.newUser(req, (err, user) => {
            if(err){
                req.flash("error", err);
                res.redirect("back");
            } else {
                //allows for req.user access
                passport.authenticate("local")(req, res, () => {
                req.flash("notice", "You've successfully created an account!");
                res.redirect("/");
                });
            }
        })
    },

    update(req, res, next){
        userQueries.customizeUser(req, (err, user) => {
            if(err){
                req.flash("error", err);
                res.redirect("/");
            } else {
                req.flash("notice", "You've successfully updated your account");
                res.redirect("/users/profile");
            }
        })
    },

    signup(req, res, next){
        res.render("users/signup")
    },

    customize(req, res, next){
        res.render("users/customize");
    },

    signinForm(req, res, next){
        res.render("users/signin")
    },

    signin(req, res, next){
        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/signinForm', failureFlash: true })(req, res);
    },

    profile(req, res, next){
        res.render("users/profile");
    },

    logout(req, res, next){
        req.logout();

        res.redirect("/");
    }
}