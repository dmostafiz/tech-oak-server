const consoleLog = require("../Helpers/consoleLog")

const ProfileController = {

    update: async (req, res) => {
        try {
            consoleLog('user body', req.body)
            // consoleLog('category user business', req.business)

            const { name, rate } = req.body

            if (!req.user) return res.json({ ok: false, msg: "you are not authenticated!" })
            // if (!req.business) return res.json({ ok: false, msg: "Business not found!" })

            const user = await req.prisma.user.update({
                where: {
                    id: req?.user?.id
                },
                data: {
                    name: name,
                    rate: rate,
                    businessId: req?.store?.id,
                }
            })

            return res.json({ ok: true, user })

        } catch (error) {
            consoleLog('tax create error', error)
            res.json({ ok: false })
        }
    },


}

module.exports = ProfileController