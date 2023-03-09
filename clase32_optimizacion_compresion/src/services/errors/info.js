export const generateUserErrorInfo = user => {
    return `Uno o mas propiedades estan incompletos o son invalidos.
    Lista de propiedades obligatorios:
        * first_name: Necesita ser un string, recibio ${user.first_name}
        * last_name: Necesita ser un string, recibio ${user.last_name}
        * email: Necesita ser un string, recibio ${user.email}
    `
}