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
                password: "1234567890"
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
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

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
            request(`${base}/songs/topDubstep`, (err, res, body) => {
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
})