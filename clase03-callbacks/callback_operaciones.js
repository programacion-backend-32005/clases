const sumar = (num1, num2) => num1 + num2
const restar = (num1, num2) => num1 - num2
const multiplicar = (num1, num2) => num1 * num2
const dividir = (num1, num2) => num1 / num2

const realizarOperacion = (numero1, numero2, callback) => {
    console.log('Voy a hacer una operacion, no se cual es. Pero lo voy a hacer Fuuaaa');
    const result = callback(numero1, numero2)
    console.log('El resultado es: ', result);
}

realizarOperacion(2, 5, sumar)
realizarOperacion(2, 5, restar)
realizarOperacion(2, 5, multiplicar)
realizarOperacion(2, 5, dividir)

