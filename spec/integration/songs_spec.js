const request = require("request");
const sequelize = require("../../src/db/models").sequelize;
const base = "http://localhost:3000";
const server = require("../../src/server");


const Song = require("../../src/db/models").Song;
const User = require("../../src/db/models").User;

describe("songs : routes", () => {

    beforeEach((done) => {
        this.user;
        this.song;

        sequelize.sync({force: true})
        .then(() => {
            User.create({
                username: "tom",
                email: "tom@gmail.com",
                password: "1234567890",
                role: 'admin'
            })
            .then((user) => {
                this.user = user;
                
                Song.create({
                    name: "Pray for Riddim",
                    artist: "Virtual Riot",
                    genre: "dubstep",
                    sound: "7654321"
                }).then((song) => {
                    this.song = song;
                    done();
                })
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("admin user functionality", () => {
        beforeEach((done) => {
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
            });
        })


        describe("POST /songs/create", () => {
            it("should create a new song", (done) => {
                const options = {
                    url: `${base}/songs/create`,
                    form: {
                        name: "BEHEMOTH",
                        artist: "SVDDEN DEATH",
                        genre: "dubstep",
                        sound: "1234567"
                    }
                };

                request.post(options, (err, res, body) => {
                    Song.findOne({where: {name: "BEHEMOTH"}})
                    .then((song) => {
                        expect(song).not.toBeNull();
                        expect(song.genre).toBe("dubstep");
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
            });
        });


        describe("/songs/top[genre]", () => {
            it("should render a view with the top songs of the genre", (done) => {
                request(`${base}/songs/topdubstep`, (err, res, body) => {
                    expect(body).toContain("Top dubstep");
                    done();
                })
            });
        });

        describe("/songs/new", () => {
            it("should render a view with input to add a new song", (done) => {
                request(`${base}/songs/new`, (err, res, body) => {
                    expect(body).toContain("Add a new song");
                    done();
                })
            });
        });

        describe("POST /songs/:id/delete", () => {
            it("should delete the song", (done) => {
                request.post(`${base}/songs/${this.song.id}/delete`, (err, res, body) => {
                    Song.findOne({where: {id: 1}})
                    .then((song) => {
                        expect(song).toBeNull();
                        done();
                    });
                });
            });
        });

        describe("POST /songs/:id/update", () => {
            it("should update the song", (done) => {
                const options = {
                    url: `${base}/songs/${this.song.id}/update`,
                    form: {
                        name: "updated"
                    }
                };

                request.post(options, (err, res, body) => {
                    Song.findOne({where: {id: this.song.id}})
                    .then((song) => {
                        expect(song.name).toBe("updated");
                        expect(song.sound).toBe(this.song.sound);
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
            });
        });

        describe("GET /songs/:id/edit", () => {
            it("should render a view to edit a song", (done) => {
                request.get(`${base}/songs/${this.song.id}/edit`, (err, res, body) => {
                    expect(body).toContain("Edit");
                    done();
                });
            })
        });

    }); //end admin section


    describe("members functionalities", () => {

        beforeEach((done) => {
            this.user.update({
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
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        });

        describe("POST /songs/create", () => {
            it("should not create a new song", (done) => {

                const options = {
                    url: `${base}/songs/create`,
                    form: {
                        name: "BEHEMOTH",
                        artist: "SVDDEN DEATH",
                        genre: "dubstep",
                        sound: "1234567"
                    }
                };

                request.post(options, (err, res, body) => {
                    Song.findOne({where: {name: "BEHEMOTH"}})
                    .then((song) => {
                        expect(song).toBeNull();
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
            });
        });

        describe("POST /songs/:id/delete", () => {
            it("should not delete the song", (done) => {
                request.post(`${base}/songs/${this.song.id}/delete`, (err, res, body) => {
                    Song.findOne({where: {id: 1}})
                    .then((song) => {
                        expect(song).not.toBeNull();
                        done();
                    });
                });
            });
        });

        describe("POST /songs/:id/update", () => {
            it("should not update the song", (done) => {
                const options = {
                    url: `${base}/songs/${this.song.id}/update`,
                    form: {
                        name: "updated"
                    }
                };

                request.post(options, (err, res, body) => {
                    Song.findOne({where: {id: this.song.id}})
                    .then((song) => {
                        expect(song.name).not.toBe("updated");
                        expect(song.sound).toBe(this.song.sound);
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
})