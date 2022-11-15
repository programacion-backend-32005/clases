

const varTest = 0
const varAsignable = varTest || "Sin Valor"
console.log(varAsignable);


const varAsignable2 = varTest ?? "Sin Valor"
console.log(varAsignable2);

class Persona {

    #fullname
    constructor(name, lastname) {
        this.name = name
        this.lastname = lastname
        this.#fullname = `${name} ${lastname}`
    }

    // getter
    getFullname = () => {
        return this.#fullname.toLowerCase()
    }

    getFullnameUpper = () => {
        return this.#fullname.toUpperCase()
    }

}

let juan = new Persona("Juan", "Viglioco")

console.log(juan.getFullname());
console.log(juan.getFullnameUpper());