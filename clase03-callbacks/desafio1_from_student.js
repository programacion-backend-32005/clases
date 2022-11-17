class ProductManager {

    constructor() {
        this.products = []
    }

    getProductId = () => {
        const amount = this.products.length;
        const productId = (amount > 0) ? this.products[amount - 1].id + 1 : 1;
        return productId;
    }

    getProducts = () => {
        return this.products
    }

    getProductById = (productId) => {
        const productFound = this.products.find(element => element.id == productId)
        if (productFound) {
            console.log("The product is: ", productFound.title);
        } else {
            console.log("Not found");
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            id: this.getProductId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const duplicatedCode = (element) => element.code == product.code;
        
        if (!this.products.some(duplicatedCode)) {
            this.products.push(product)
        } else {
            console.log("A Code is duplicated")
        }

    }

}

const product = new ProductManager()

console.log("First call", product.getProducts());

product.addProduct("Book One", "The first Book", 10, "image", "code1", 6)
product.addProduct("Book One", "The first Book", 10, "image", "code1", 6)
product.addProduct("Book Two", "The second Book", 11, "image", "code2", 6)
product.addProduct("Book Three", "The third Book", 12, "image", "code3", 6)
product.addProduct("Book Four", "The fourth Book", 13, "image", "code4", 6)

product.getProductById(1)

console.log("After push", product.getProducts());