module.exports = {
    init(app){
        const userRoutes = require("../routes/users");

        app.use(userRoutes);
    }
}