const originales = [1, 2, 3, 4, 5]

// El argumento callback es una funcion
const myMap = (array, callback) => {
    const newArray = []
    for (const element of array) {
        const newElement = callback(element) // Aca ejecuto el callback
        newArray.push(newElement)
    }

    return newArray
}

const newArray = myMap(originales, x => x * 2)
console.log(newArray);


Array.prototype.print = function() {
    console.log("Imprime valores")
}
const miListaGenerada = [1, 2, 3, 4, 5]
const mascotas = ["gatos", "perrs", "peces"]

miListaGenerada.print()
mascotas.print()





Array.prototype.myMap2 = function(callback) {
    const newArray = []
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        const newElement = callback(element) // Aca ejecuto el callback
        newArray.push(newElement)
    }

    return newArray
}

const miLista = [1, 2, 3, 4, 5]
const newLista = miLista.myMap2(x => x * 3)
console.log(newLista);