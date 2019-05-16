module.exports = {
    init(app){
        const userRoutes = require("../routes/users");
        const songRoutes = require("../routes/songs");
        const favoriteRoutes = require("../routes/favorites");

        if(process.env.NODE_ENV === "test") {
            const mockAuth = require("../../spec/auth/auth.js");
            mockAuth.fakeIt(app);
        }

        app.use(favoriteRoutes);
        app.use(songRoutes);
        app.use(userRoutes);
    }
}