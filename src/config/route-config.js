module.exports = {
    init(app){
        const userRoutes = require("../routes/users");
        const songRoutes = require("../routes/songs");
        const favoriteRoutes = require("../routes/favorites");

        app.use(favoriteRoutes);
        app.use(songRoutes);
        app.use(userRoutes);
    }
}