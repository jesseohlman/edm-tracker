const request = require("request");
const sequelize = require("../../src/db/models").sequelize;
const User = require("../../src/db/models").User;
const base = "http://localhost:3000"
const server = require("../../src/server");

describe("user : routes", () => {

    beforeEach((done) => {
        this.user;

        sequelize.sync({force: true})
        .then((res) => {
            User.create({
                username: "bob",
                email: "bob@gmail.com",
                password: "1234567890",
                role: "member"
            }).then((user) => {
                this.user = user;

                request.get({
                    url: "http://localhost:3000/auth/fake",
                    form: {
                      username: this.user.username,
                      role: this.user.role,
                      userId: this.user.id,
                      email: this.user.email
                    }
                  },
                  (err, res, body) => {
                    done();
                  })
            })
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    });

    describe("GET /users/signup", () => {

        it("should render a view where a guest can create an account", (done) => {
            request.get(`${base}/users/signup`, (err, res, body) => {
                expect(body).toContain("email");
                expect(body).toContain("password");
                done();
            });
        });
    });

    describe("POST /users/create", () => {

        it("should create a new user", (done) => {

            const options = {
                url: `${base}/users/create`,
                form: {
                    username: "toby",
                    email: "123@gmail.com",
                    password: "1234567890"
                }
            };

            request.post(options, (err, res, body) => {
                User.findOne({where: {email: "123@gmail.com"}})
                .then((user) => {
                    expect(user).not.toBeNull();
                    expect(user.username).toBe("toby");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
            })
        });

        it("should not create a new user with repeat email", (done) => {
            const options = {
                url: `${base}/users/create`,
                form: {
                    username: "toby",
                    email: "bob@gmail.com",
                    password: "1234567890"
                }
            };
            
            request.post(options, (err, res, body) => {
                User.findOne({where: {username: "toby"}})
                .then((user) => {
                    expect(user).toBeNull();
                    done();
                })
            })
        });

        it("should not create a user with invalid inputs", (done) => {
            const options = {
                url: `${base}/users/create`,
                form: {
                    username: "to",
                    email: "123@gmail.com",
                    password: "1234567890"
                }
            };

            request.post(options, (err, res, body) => {
                User.findOne({where: {email: "123@gmail.com"}})
                .then((user) => {
                    expect(user).toBeNull();
                    done();
                })
            })
        })

    });

    describe("POST /users/update", () => {
        it("should update the user with their preferences", (done) => {

            const options = {
                url: `${base}/users/update`,
                form: {
                    favorite1: "dubstep",
                    favorite2: "house",
                    favorite3: "psytrance",
                    pic: "bean"
                }
            };

            request.post(options, (err, res, body) => {
                User.findOne({where: {pic: "bean"}})
                .then((user)  => {
                    expect(user).not.toBeNull();
                    expect(user.favorite1).toBe("dubstep");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });
})

