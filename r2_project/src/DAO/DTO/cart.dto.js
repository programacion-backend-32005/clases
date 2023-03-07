export default class CartDTO {

    constructor(cart) {
        this.id = cart.id || cart._id || null
        this.products = cart.products || []
    }
}