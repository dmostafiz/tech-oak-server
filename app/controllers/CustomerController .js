const consoleLog = require("../Helpers/consoleLog")
const TryCatch = require("../Helpers/TryCatch")


const CustomerController = {

    createCustomer: async (req, res) => {
        TryCatch(res, async () => {

            const businessId = req.business.id

            const customer = await req.prisma.customer.create({
                data: {
                    prefix: req.body.prefix,
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    lastName: req.body.lastName,
                    mobile: req.body.mobile,
                    alternativeMobile: req.body.alternativeMobile,
                    landLine: req.body.landLine,
                    email: req.body.email,
                    taxNumber: req.body.taxNumber,
                    addressOne: req.body.addressOne,
                    addressTwo: req.body.addressTwo,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    zipCode: req.body.zipCode,
                    description: req.body.description,
                    businessId: businessId,
                    status: true
                }
            })


            res.json({ok: true, customer})
            
        })
    },

    getCustomers: async (req, res) => {

        TryCatch(res, async () => {

            const businessId = req.business.id

            const customers = await req.prisma.customer.findMany({
                where: {
                    businessId: businessId,
                    status: true
                }
            })

            res.json({ ok: true, customers: customers })
        })
    },

    deleteCustomer: async (req, res) => {

        TryCatch(res, async () => {

           
        })
    }

}

module.exports = CustomerController