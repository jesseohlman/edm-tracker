const request = require("request");
const sequelize = require("../../src/db/models").sequelize;
const base = "http://localhost:3000";
const server = require("../../src/server");

const Playlist = require("../../src/db/models").Playlist;
const Song = require("../../src/db/models").Song;
const User = require("../../src/db/models").User;


describe("playlist : routes", () => {

    beforeEach((done) => {
        this.song;
        this.user;
        this.playlist;

        sequelize.sync({force: true})
        .then(() => {
            User.create({
                username: "bob",
                email: "bob@gmail.com",
                password: "1234567890"
            })
            .then((user) => {
                this.user = user;

                Song.create({
                    name: "wobble",
                    artist: "bob",
                    genre: "dubstep",
                    sound: "1234567890"
                })
                .then((song) => {
                    this.song = song;

                    Playlist.create({
                        name: "edm",
                        userId: this.user.id
                    })
                    .then((playlist) => {
                        this.playlist = playlist;

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
                })
            });
        })
        .catch((err) => {
            console.log(err);
            done();
    });


    describe("POST /users/playlist/create", () => {
        it("should create a new playlist", (done) => {
            const options = {
                url: `${base}/users/playlist/create`,
                form: {
                    name: "wobbles",
                    userId: this.user.id
                }
            };

            request.post(options, (err, res, body) => {
                Playlist.findOne({where: {name: "wobbles"}})
                .then((playlist) => {
                    expect(playlist).not.toBeNull();
                    expect(playlist.name).toBe("wobbles");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("POST /users/playlist/add", () => {
        it("should add a song to the playlist", (done) => {
            const options = {
                url: `${base}/users/playlist/add`,
                form: {
                    songId: this.song.id,
                    playlistId: this.playlist.id
                }
            };

            request.post(options, (err, res, body) => {
                Playlist.findOne({where: {id: this.playlist.id}})
                .then((playlist) => {
                    expect(playlist).not.toBeNull();
                    expect(playlist.getSongs).not.toBeNull();
                })
            })
        })
    })
})