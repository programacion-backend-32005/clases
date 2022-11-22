
const temporizador = (callback) => {
    setTimeout(callback, 0)
}

const operacion = () => console.log('La operacion ha sido realizada');

console.log('Start task!!');

temporizador(operacion)

console.log('El nudo del asunto');

console.log('Finished');