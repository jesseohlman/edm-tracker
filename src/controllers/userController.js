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
                passport.authenticate('local', { failureRedirect: '/users/signup' })
                req.flash("notice", "You've successfully created an account!");
                res.redirect("/");
            }
        })
    },

    update(req, res, next){
        console.log(`req.body.user: ${req.body.user} , userId: ${req.body.userId} `);
        userQueries.customizeUser(req, (err, user) => {
            if(err){
                req.flash("error", err);
                res.redirect("/");
            } else {
                req.flash("notice", "You've successfully created an account!");
                req.redirect("/");
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
    }
}