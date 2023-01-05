const consoleLog = require("../Helpers/consoleLog")

const PosController = {

    create: async (req, res) => {
        try {
            // consoleLog('expense body', req.body)
            // consoleLog('category user business', req.business)

            const { type, amount, note, expenseDate } = req.body

            if (!req.user) return res.json({ ok: false, msg: "you are not authenticated!" })
            if (!req.business) return res.json({ ok: false, msg: "Business not found!" })

            const expense = await req.prisma.expense.create({
                data: {
                    type: type,
                    note: note,
                    amount: amount,
                    businessId: req?.business?.id,
                    expenseDate: expenseDate
                }
            })

            return res.json({ ok: true, expense })

        } catch (error) {
            consoleLog('expense create error', error)
            res.json({ ok: false })
        }
    },

    getProducts: async (req, res) => {
        try {

            const businessId = req?.business?.id
            const userId = req?.user?.id


            if(!businessId) return res.json({ ok: false, msg: "Business not found!" })

            const products= await req.prisma.product.findMany({
                where: {
                    businessId: businessId
                },
                orderBy: {
                    createdAt: "desc"
                }
            })

            // consoleLog('Business products', products)

            return res.json({ ok: true, products})

        } catch (error) {
            consoleLog('get pos products error', error)
            res.json({ ok: false })
        }
    },

    deletePos: async (req, res) => {
        try {

            const {id} = req.body 

            const expense = await req.prisma.expense.findFirst({
                where: {
                    id: id,
                    businessId: req?.business?.id
                },
                // include: {

                // }
            })

            // consoleLog('Delete Category', category)

            const deleteExpense = await req.prisma.expense.delete({
                where: {
                    id: brand.id
                }
            })

            res.json({ok:true})
            
        } catch (error) {
            consoleLog('Expense Delete Error', error)
            res.json({ok:false})
        }
    }
}

module.exports = PosController