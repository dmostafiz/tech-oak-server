const authRoutes = require("./authRoutes");
const brandRoutes = require("./brandRoutes");
const businessRoutes = require("./businessRoutes");
const categoryRoutes = require("./categoryRoutes");
const customerRoutes = require("./customerRoutes");
const productRoutes = require("./productRoutes");
const purchaseRoutes = require("./purchaseRoutes");
const saleRoutes = require("./saleRoutes");
const supplierRoutes = require("./supplierRoutes");
const systemRouter = require("./systemRouter");
const taxdRoutes = require("./taxRoutes");
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
  app.use('/tax', taxdRoutes)
  app.use('/product', productRoutes)
  app.use('/purchase', purchaseRoutes)
  app.use('/sale', saleRoutes)

}

module.exports = indexRouter;
