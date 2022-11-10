class Counter {
    constructor(responsible) {
        this.responsible = responsible
        this.count_local = 0 // Atributo de clase. COnserva el valor  individual para instancias
    }

    static count_global = 0 // Var estatica. Es la misma en todas las instancias

    getResponsible = () => {
        return this.responsible
    }
    count = () => {
        this.count_local++ // Solo afecta al valor de la instancia
        Counter.count_global++ // Afecta a TODOS !!
    }
    getCountLocal = () => {return this.count_local}
    getCountGlobal = () => {return this.count_global}
}


// Creamos instancias de Counter
const vigliocco = new Counter('vigliocco')
const jesusGomez = new Counter('Jesus Gomez')
const r2 = new Counter('R2')
const evelyn = new Counter('Evelyn')

// Ejecutamos el count()
vigliocco.count()
vigliocco.count()
r2.count()
// vigliocco.count()
// jesusGomez.count()
// vigliocco.count()
// evelyn.count()
// evelyn.count()
// evelyn.count()
// evelyn.count()
// evelyn.count()
// r2.count()

console.log(`${vigliocco.getResponsible()}: ${vigliocco.getCountLocal()}`)
console.log(`${jesusGomez.getResponsible()}: ${jesusGomez.getCountLocal()}`)
console.log(`${r2.getResponsible()}: ${r2.getCountLocal()}`)
console.log(`${evelyn.getResponsible()}: ${evelyn.getCountLocal()}`)

console.log(Counter.count_global);