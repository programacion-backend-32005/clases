import fs from "fs"

class CartManager {

    constructor(path) {
        this.path = path
    }

    read = () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, "utf-8").then(r => JSON.parse(r))
        }
        return []
    }

    write = list => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
    }

    getNextID = list => {
        const count = list.length
        return (count > 0) ? list[count - 1].id + 1 : 1
    }

    getById = async (id) => {
        const data = await this.read()
        return data.find(p => p.id == id)
    }

    get = async () => {
        const data = await this.read()
        return data
    }

    create = async () => {
        const carts = await this.read()
        const nextID = this.getNextID(carts)
        const newCart = {
            id: nextID,
            products: []
        }
        carts.push(newCart)
        await this.write(carts)
        return newCart
    }

    update = async (id, obj) => {
        obj.id = id
        const list = await this.read()
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list[i] = obj
                await this.write(list)
                break
            }
        }
    }

    addProduct = async (cartID, productID) => {
        const cart = await this.getById(cartID)
        let found = false
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].id == productID) {
                cart.products[i].quantity++
                found = true
                break
            }
        }
        if (found == false) {
            cart.products.push({ id: productID, quantity: 1 })
        }
        await this.update(cartID, cart)
        return cart
    }

}

export default CartManager