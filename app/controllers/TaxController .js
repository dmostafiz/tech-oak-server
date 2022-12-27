const consoleLog = require("../Helpers/consoleLog")

const brandController = {

    create: async (req, res) => {
        try {
            consoleLog('tax body', req.body)
            // consoleLog('category user business', req.business)

            const { name, rate } = req.body

            if (!req.user) return res.json({ ok: false, msg: "you are not authenticated!" })
            if (!req.business) return res.json({ ok: false, msg: "Business not found!" })

            const tax = await req.prisma.tax.create({
                data: {
                    name: name,
                    rate: rate,
                    businessId: req?.business?.id,
                }
            })

            return res.json({ ok: true, tax })

        } catch (error) {
            consoleLog('tax create error', error)
            res.json({ ok: false })
        }
    },

    getTaxes: async (req, res) => {
        try {

            const businessId = req?.business?.id
            const userId = req?.user?.id

            const taxes = await req.prisma.tax.findMany({
                where: {
                    businessId: businessId
                }
            })

            // consoleLog('Business taxes', taxes)

            return res.json({ ok: true, taxes })

        } catch (error) {
            consoleLog('get taxes error', error)
            res.json({ ok: false })
        }
    },


    deleteTax: async (req, res) => {
        try {

            const { id } = req.body

            const tax = await req.prisma.tax.findFirst({
                where: {
                    id: id,
                    businessId: req?.business?.id
                },
                // include: {

                // }
            })



            // consoleLog('Delete Category', category)

            const deleteTax = await req.prisma.tax.delete({
                where: {
                    id: tax.id
                }
            })

            res.json({ ok: true })

        } catch (error) {
            consoleLog('Tax Delete Error', error)
            res.json({ ok: false })
        }
    }
}

module.exports = brandController