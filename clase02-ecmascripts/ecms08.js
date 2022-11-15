const impuestos = {
    impuestoIVA: 16,
    impuestoRenta: 80,
    impuestoCarro: 170
}

let parLlaveValor = Object.entries(impuestos)
// console.log(parLlaveValor);
// console.log(parLlaveValor[0]);

let justKeys = Object.keys(impuestos)
console.log(justKeys);

let justValues = Object.values(impuestos)
console.log(justValues);

console.log('--------------------------------------------------------------------------');
let impuestosTotales = justValues.reduce(reducE)

function reducE(acumulado, elemento) {
    console.log("->", acumulado, elemento);
    return acumulado - elemento
}

console.log(impuestosTotales);


