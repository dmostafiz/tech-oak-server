const consoleLog = require("../Helpers/consoleLog")

const ProductController = {

    create: async (req, res) => {
        try {
            consoleLog('brand body', req.body)
            // consoleLog('category user business', req.business)

            const { name, status, description } = req.body

            if (!req.user) return res.json({ ok: false, msg: "you are not authenticated!" })
            if (!req.business) return res.json({ ok: false, msg: "Business not found!" })

            const product = await req.prisma.product.create({
                data: {
                    name: req.body.name,
                    sku: req.body.sku,
                    unitId: req.body.unitId,
                    brandId: req.body.brandId,
                    categoryId: req.body.categoryId,
                    businessId: req.business.id,
                    taxId: req.body.taxId,
                    alertQuantity: req.body.alertQuantity,
                    description: req.body.description,
                    image: req.body.image,
                    weight: req.body.weight,
                    status: req.body.status == 'yes' ? true : false,
                }

            })

            return res.json({ ok: true, product })

        } catch (error) {
            consoleLog('product create error', error)
            res.json({ ok: false })
        }
    },

    getProducts: async (req, res) => {
        try {

            const businessId = req?.business?.id
            const userId = req?.user?.id

            const products = await req.prisma.product.findMany({
                where: {
                    businessId: businessId
                }
            })

            // consoleLog('Business products', products)

            return res.json({ ok: true, products })

        } catch (error) {
            consoleLog('get brands error', error)
            res.json({ ok: false })
        }
    },

    deleteProduct: async (req, res) => {
        try {

            const { id } = req.body

            const product = await req.prisma.product.findFirst({
                where: {
                    id: id,
                    businessId: req?.business?.id
                },
                // include: {

                // }
            })



            // consoleLog('Delete Category', category)

            const deleteProduct = await req.prisma.product.delete({
                where: {
                    id: product.id
                }
            })

            res.json({ ok: true })

        } catch (error) {
            consoleLog('Product Delete Error', error)
            res.json({ ok: false })
        }
    }
}

module.exports = ProductController