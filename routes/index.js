const authRoutes = require("./authRoutes");
const systemRouter = require("./systemRouter");

// /* GET home page. */
// require('./systemRouter')(router)

const indexRouter = (app) => {
  app.use('/auth', authRoutes);
  app.use('/', systemRouter)
}

module.exports = indexRouter;
