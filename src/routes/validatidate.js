module.exports = {
    userValidate(req, res, next){
        if(req.method === "POST"){
            req.checkBody("username", "username must be at least 3 characters long").isLength({min: 3});
            req.checkBody("email", "email must be a valid").isEmail();
            req.checkBody("password", "password must be at least 8 characters in length").isLength({min: 8});
        }

        const errors = req.validationErrors();
        if(errors) {
            req.flash("error", errors);
            return res.redirect("back");
        } else {
            return next();
        }
    }
}