const consoleLog = require("../Helpers/consoleLog")

const brandController = {

    create: async (req, res) => {
        try {
            consoleLog('brand body', req.body)
            // consoleLog('category user business', req.business)

            const { name, status, description } = req.body

            if (!req.user) return res.json({ ok: false, msg: "you are not authenticated!" })
            if (!req.business) return res.json({ ok: false, msg: "Business not found!" })

            const brand = await req.prisma.brand.create({
                data: {
                    name: name,
                    description: description,
                    status: status == 'yes' ? true : false,
                    businessId: req?.business?.id,
                }
            })

            return res.json({ ok: true, brand })

        } catch (error) {
            consoleLog('brand create error', error)
            res.json({ ok: false })
        }
    },

    getBrands: async (req, res) => {
        try {

            const businessId = req?.business?.id
            const userId = req?.user?.id

            const brands= await req.prisma.brand.findMany({
                where: {
                    businessId: businessId
                }
            })

            // consoleLog('Business brands', brands)

            return res.json({ ok: true, brands})

        } catch (error) {
            consoleLog('get brands error', error)
            res.json({ ok: false })
        }
    },

    getParentBrands: async (req, res) => {
        try {

            const businessId = req?.business?.id 

            const brands= await req.prisma.brand.findMany({
                where: {
                    businessId: businessId,
                    isSubcategory: false
                }
            })

            return res.json({ok: true, brands})
            
        } catch (error) {
            consoleLog('parent brands error', error)
            res.json({ok: false})
        }
    },

    deleteBrand: async (req, res) => {
        try {

            const {id} = req.body 

            const brand = await req.prisma.brand.findFirst({
                where: {
                    id: id,
                    businessId: req?.business?.id
                },
                // include: {

                // }
            })



            // consoleLog('Delete Category', category)

            const deleteBrand = await req.prisma.brand.delete({
                where: {
                    id: brand.id
                }
            })

            res.json({ok:true})
            
        } catch (error) {
            consoleLog('Brand Delete Error', error)
            res.json({ok:false})
        }
    }
}

module.exports = brandController