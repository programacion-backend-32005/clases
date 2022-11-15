const modo = "calculos"

async function examplaImport() {
    if(modo == "calculos") {
        const { default: Calculadora } = await import('./lib.js')
        let calculadora2 = new Calculadora()
        console.log(calculadora2.sumar(1, 2))
    }

}

examplaImport()