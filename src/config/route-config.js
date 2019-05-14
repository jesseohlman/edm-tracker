module.exports = {
    init(app){
        const userRoutes = require("../routes/users");
        const songRoutes = require("../routes/songs");

        app.use(songRoutes);
        app.use(userRoutes);
    }
}