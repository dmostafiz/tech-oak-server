const authRoutes = require("./authRoutes");
const brandRoutes = require("./brandRoutes");
const businessRoutes = require("./businessRoutes");
const categoryRoutes = require("./categoryRoutes");
const customerRoutes = require("./customerRoutes");
const supplierRoutes = require("./supplierRoutes");
const systemRouter = require("./systemRouter");
const unitRoutes = require("./unitRoutes");
const variationRoutes = require("./variationRoutes");

// /* GET home page. */
// require('./systemRouter')(router)

const indexRouter = (app) => {
  app.use('/auth', authRoutes);
  app.use('/', systemRouter)
  app.use('/business', businessRoutes)
  app.use('/category', categoryRoutes)
  app.use('/brand', brandRoutes)
  app.use('/variation', variationRoutes)
  app.use('/unit', unitRoutes)
  app.use('/supplier', supplierRoutes)
  app.use('/customer', customerRoutes)

}

module.exports = indexRouter;
