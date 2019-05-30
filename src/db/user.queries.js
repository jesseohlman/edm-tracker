const User = require("../db/models").User;
const bcrypt = require("bcryptjs");

module.exports = {
    newUser(req, callback){
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        User.findOne({where: {email: req.body.email}})
        .then((user) => {
            if(user === null){
                User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword
                }).then((user) => {
                    callback(null, user)
                })
                .catch((err) => {
                    callback(err);
                })
        } else {
            callback("that email is already attached to a user");
        }
    })
    },

    customizeUser(req, callback){
        User.findOne({where: {id: req.user.id}})
        .then((user) => {
        user.update({
            username: req.body.username,
            favorite1: req.body.favorite1,
            favorite2: req.body.favorite2,
            favorite3: req.body.favorite3
        }).then((user) => {
            callback(null, user)
        })
        .catch((err) => {
            callback(err);
        })
    })
    }
}