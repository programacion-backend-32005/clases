const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if(divisor == 0) reject('Division entre 0')
        else resolve(dividendo/divisor)
    })
}

dividir(34, 7)
    .then(resultado => console.log('Todo salio OK', resultado))
    .catch(error => console.error('Algo salio mal:', error))

dividir(56, 0)
    .then(resultado => console.log('Todo salio OK', resultado))
    .catch(error => console.error('Algo salio mal:', error))

console.log("FIN");