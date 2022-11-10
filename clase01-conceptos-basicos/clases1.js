class Persona {

    constructor(nombre) {
        console.log("Se ha creado una persona");

        this.nombre = nombre
        this.age = 30
    }

    static especie = "humano"

    speak() {
        console.log("My name is ", this.nombre);
    }

    walk = () => {
        console.log("Like moon walk!!");
    }

}

let igna = new Persona('Igna')
let vigliocco = new Persona('Juan Vigliocco')
let Mauricio = new Persona()

igna.speak()
vigliocco.speak()
Mauricio.walk()