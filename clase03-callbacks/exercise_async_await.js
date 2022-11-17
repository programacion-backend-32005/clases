const sumar = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if(num1 == 0 || num2 == 0) reject('Operacion innecesaria')
        else if(num1 < 0 || num2 < 0) reject('Solo se trabaja con numeros positivos')
        else resolve(num1 + num2)
    })
}

const restar = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if(num1 == 0 || num2 == 0) return reject('Operacion invalida')
        const result = num1 - num2
        if (result < 0) return reject('Solo devuelve numeros positivos')

        return resolve(result)
    })
}

const multiplicar = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if(num1 < 0 || num2 < 0) return reject('La calculadora solo devuelve numeros positivos')
        resolve(num1 * num2)
    })
}

const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if(divisor == 0) reject('Division entre 0')
        else resolve(dividendo/divisor)
    })
}

const funcAsync = async() => {
    try {
        console.log(await sumar(12, 34))
        console.log(await restar(34, 12))
        console.log(await multiplicar(12, 34))
        console.log(await dividir(12, 34))
    } catch (error) {
        console.log("ERROR:", error);
    }
}

//funcAsync()

sumar(12, 34)
    .then(result => console.log(result))
    .catch(e => console.error(e))

restar(12, 34)
    .then(result => console.log(result))
    .catch(e => console.error(e))

multiplicar(12, 34)
    .then(result => console.log(result))
    .catch(e => console.error(e))

dividir(12, 34)
    .then(result => console.log(result))
    .catch(e => console.error(e))
