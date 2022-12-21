const authRoutes = require("./authRoutes");
const businessRoutes = require("./businessRoutes");
const systemRouter = require("./systemRouter");

// /* GET home page. */
// require('./systemRouter')(router)

const indexRouter = (app) => {
  app.use('/auth', authRoutes);
  app.use('/', systemRouter)
  app.use('/business', businessRoutes)
}

module.exports = indexRouter;
