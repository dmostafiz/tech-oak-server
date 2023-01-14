const consoleLog = require("../Helpers/consoleLog")

const BusinessController = {

    getOwnerBusinesses: async (req, res) => {

        try {

            const userId = req.user.id


            const businesses = await req.prisma.business.findMany({
                where: {
                    adminId: userId
                }
            })

            consoleLog('My Businesses', businesses)

            res.json({ ok: true, businesses })

        } catch (error) {
            consoleLog('get business error', error)
        }

    },

    createOwnerBusinesses: async (req, res) => {

        try {

            const userId = req.user.id

            const { name, location, contact, city, state, zip } = req.body

            const business = await req.prisma.business.create({
                data: {
                    name: name,
                    phone: contact,
                    location: location,
                    city: city,
                    state: state,
                    zip: zip,
                    status: true,
                    isDefault: true,
                    adminId: userId
                }
            })

            const user = await req.prisma.user.update({
                where: {
                    id: userId
                },
                
                data: {
                    storeId: business.id
                }
            })

            consoleLog('Business created', business)

            return res.json({ok: true, business})

        } catch (error) {
            consoleLog('create business error', error)
            res.json({ ok: false })
        }
    }
}

module.exports = BusinessController