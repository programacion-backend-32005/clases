
const contador = () => {
    let counter = 1
    console.log('Iniciando contador');
    const timer = setInterval(() => {
        console.log(counter++)
        if (counter > 5) {
            clearInterval(timer)
        }
    }, 2000)
}

console.log('Start task!!');
contador()
console.log('Finished');