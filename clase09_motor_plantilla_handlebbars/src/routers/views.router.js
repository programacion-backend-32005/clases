import express from 'express'

const router = express.Router()
const foods = [
    {name: "Burguers", price: 100},
    {name: "Pizza", price: 150},
    {name: "Soda", price: 40},
    {name: "Salads", price: 75},
    {name: "Banana", price: 20}
]

router.get('/', (req, res) => {
    const testUser = {
        name: "Pablo",
        lastname: "Maglione",
        role: "admin"
    }

    res.render('food', {
        user: testUser,
        style: 'index.css',
        isAdmin: testUser.role === "admin",
        foods
    })
})

export default router