const consoleLog = require("../Helpers/consoleLog")


const ReportController = {

   getHeadingReports: async (req, res, next) => {

      try {

         const businessId = req?.business?.id
         const userId = req?.user?.id

         const date = req.query.date
         const query = req.query.query

         if (!businessId) return res.json({ ok: false })


         const sales = await req.prisma.invoice.findMany({
            where: {
               businessId: businessId,
               type: 'sale',
               createdAt: {
                  gte: new Date(date[0]),
                  lte: new Date(date[1]),
               },

            },

            orderBy: {
               createdAt: 'desc'
            },

            include: {
               customer: true,
               sales: {
                  include: {
                     product: true
                  }
               },
               business: true
            }

         })


         const salesData = {
            totalSales: sales.reduce((total, current) => {
               return total + current.totalAmount
            }, 0),

            totalPaid: sales.reduce((total, current) => {
               return total + current.paid
            }, 0),

            totalDue: sales.reduce((total, current) => {
               return total + current.due
            }, 0),

            salesCount: sales.reduce((total, current) => {
               return total + current.sales?.length
            }, 0),

         }

         consoleLog('Sales data', salesData)



         const purchases = await req.prisma.invoice.findMany({
            where: {
               businessId: businessId,
               type: 'purchase',
               createdAt: {
                  gte: new Date(date[0]),
                  lte: new Date(date[1]),
               },
            },

            orderBy: {
               createdAt: 'desc'
            },

            include: {
               customer: true,
               purchases: {
                  include: {
                     product: true
                  }
               },
               business: true
            }
         })

         const purcasesData = {
            totalSales: purchases.reduce((total, current) => {
               return total + current.totalAmount
            }, 0),

            totalPaid: purchases.reduce((total, current) => {
               return total + current.paid
            }, 0),

            totalDue: purchases.reduce((total, current) => {
               return total + current.due
            }, 0),

            purchaseCount: purchases.reduce((total, current) => {
               return total + current.purchases?.length
            }, 0),

         }

         consoleLog('Purchase data', purcasesData)


         return res.json({ ok: true, sale: salesData, purchase: purcasesData })

      } catch (error) {

         consoleLog('Heading report error', error)
         res.json({ ok: false })
      }
   }

}

module.exports = ReportController