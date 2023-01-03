const CloudinaryHelper = require("../Helpers/CloudinaryHelper")
const consoleLog = require("../Helpers/consoleLog")

const PurchaseController = {

    create: async (req, res) => {
        try {
            consoleLog('purchase body', req.body)
     
            if (!req.user) return res.json({ ok: false, msg: "you are not authenticated!" })
            if (!req.business) return res.json({ ok: false, msg: "Business not found!" })

            const invoice = await req.prisma.invoice.create({
                data: {
                    type: 'purchase',
                    supplierId: req.body.supplierId,
                    refNo: req.body.sku || (1000 + (await req.prisma.invoice.count())).toString(),
                    businessId: req.business.id,
                    totalAmount: +req.body.totalAmount,
                    paid: +req.body.paidAmount,
                    due: +req.body.dueAmount,
                    note: req.body.note,
                    invoiceData: req.body.purchaseDate,
                    status: true,
                }
            })

            await Promise.all(req?.body?.purchasePrducts?.map(async (product) => {

                await req.prisma.purchase.create({
                    data: {
                        supplierId: req.body.supplierId,
                        businessId: req.business.id,
                        invoiceId: invoice.id,
                        productId: product.id,
                        quantity: +product.qty,
                        unitPrice: product.purchasePrice,
                        total: product.purchasePrice * product.qty,
                        taxId: product.taxId,
                        taxRate: +product.taxRate
                    }
                })

                await req.prisma.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        stock: {
                            increment: +product.qty
                        }
                    }
                })

            }))

            const getInvoice = await req.prisma.invoice.findFirst({
                where: {
                    id: invoice.id
                },
                include: {
                    supplier: true,
                    purchases: {
                        include: {
                            product: true
                        }
                    },
                }
            })

            consoleLog('Created invoice', getInvoice)

            return res.json({ ok: true, invoice:getInvoice })

        } catch (error) {
            consoleLog('purchase create error', error)
            res.json({ ok: false })
        }
    },

    getInvoices: async (req, res) => {
        try {

            const date = req.query.date
            const query = req.query.query


            const businessId = req?.business?.id
            const userId = req?.user?.id

            const invoices = await req.prisma.invoice.findMany({
                where: {
                    businessId: businessId,
                    type: 'purchase',
                    createdAt: {
                        gte: new Date(date[0]),
                        lte: new Date(date[1]),
                    },

                    OR: [
                        {
                            refNo: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        },

                        {
                            supplier: {
                                firstName: {
                                    contains: query,
                                    mode: 'insensitive'
                                }
                            }
                        },

                        {
                            supplier: {
                                lastName: {
                                    contains: query,
                                    mode: 'insensitive'
                                }
                            }
                        },

                        {
                            supplier: {
                                email: {
                                    contains: query,
                                    mode: 'insensitive'
                                }
                            }
                        },

                        {
                            supplier: {
                                mobile: {
                                    contains: query,
                                    mode: 'insensitive'
                                }
                            }
                        },
                    ]
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    supplier: true,
                    purchases: {
                        include: {
                            product: true
                        }
                    },
                }
            })

            // consoleLog('Business invoices', invoices)

            return res.json({ ok: true, invoices })

        } catch (error) {
            consoleLog('get brands error', error)
            res.json({ ok: false })
        }
    },

    searchProducts: async (req, res) => {
        try {

            const businessId = req?.business?.id
            const userId = req?.user?.id

            const query = req.params.query

            console.log('product search query: ', query)

            const products = await req.prisma.product.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { sku: { contains: query, mode: 'insensitive' } },
                    ]
                },
                take: 5,
                include: {
                    category: true,
                    brand: true,
                    tax: true,
                    unit: true
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

module.exports = PurchaseController