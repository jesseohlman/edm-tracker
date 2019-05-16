
module.exports = {
    fakeIt(app){
        let username, email, id, role,// favorite1, favorite2, favorite3, pic;

        middleware = (req, res, next) => {

                username = req.body.username || username;
                email = req.body.email || email;
                id = req.body.userId || id;
                role = req.body.role || role;
               /* favorite1 = req.body.favorite1 || favorite1;
                favorite2 = req.body.favorite2 || favorite2;
                favorite3 = req.body.favorite3 || favorite3;
                pic = req.body.pic || pic;*/

                if(id && id !== 0){
                    req.user = {
                        "username": username,
                        "email": email,
                        "id": id,
                        "role": role,
                       /* "favorite1": favorite1,
                        "favorite2": favorite2,
                        "favorite3": favorite3,
                        "pic": pic*/
                    }
                } else if(id === 0) {
                    delete req.user;
                }

                if(next){next()}
        }

        function route(req, res){
            res.redirect("/")
        }

        app.use(middleware)
        app.get("/auth/fake", route);
    }
}