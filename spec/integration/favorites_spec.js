const request = require("request");
const sequelize = require("../../src/db/models").sequelize;
const base = "http://localhost:3000";
const server = require("../../src/server");

const Favorite = require("../../src/db/models").Favorite;
const User = require("../../src/db/models").User;
const Song = require("../../src/db/models").Song;



describe("favorite : routes", () => {

    beforeEach((done) => {
        this.user;
        this.song;
        this.favorite;

        sequelize.sync({force: true})
        .then(() => {
            User.create({
                username: "tom",
                email: "tom@gmail.com",
                password: "1234567890"
            }).then((user) => {
                this.user = user;

                Song.create({
                    name: "Big House",
                    genre: "house",
                    artist: "bud",
                    sound: "1234567"
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
                      })
                })
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("POST /songs/favorite", () => {
        it("should create a new favorite", (done) => {
            const options = {
                url: `${base}/songs/favorite`,
                form: {
                    songId: this.song.id
                }
            };

            request.post(options, (err, res, body) => {
                Favorite.findOne({where: {userId: this.user.id, songId: this.song.id}})
                .then((favorite) => {
                    expect(favorite).not.toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("POST /songs/unfavorite", () => {
        it("should unfavorite a song", (done) => {
            Favorite.create({
                userId: this.user.id,
                songId: this.song.id
            }).then((fav) => {

                const options = {
                    url: `${base}/songs/unfavorite`,
                    form: {
                        songId: this.song.id
                    }
                };

                request.post(options, (err, res, next) => {
                    Favorite.findOne({where: {userId: this.user.id}})
                    .then((fav) => {
                        expect(fav).toBeNull();
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    })
                });
            });
        });

    });

    describe("GET /users/profile/favorites", () => {
        it("should render a vieew with the user's favorites", (done) => {
            request.get(`${base}/users/profile/favorites`, (err, res, body) => {
                expect(body).toContain("Your favorited songs");
                done();
            })
        })
    })
})