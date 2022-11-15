const obj1 = {
    field11: 222,
    field22: "Byron",
    field33: true,
    field44: "Valentin Meier",
    field66: 666
}

const obj2 = {
    field1: "Casas",
    field2: [2, 3, 4, 6, 7]
}

// SPREAD OPERATOR
const {field11, field22 } = obj2
console.log(field11, field22);

const obj3 = {...obj1, ...obj2} 
console.log(obj3);

const obj4 = {
    field111: 222,
    field222: "Byron",
    field333: true,
    field444: "Valentin Meier",
    field666: 666
}

// REST OPERATOR
const {field111, ...rest} = obj4
console.log(field111);
console.log(rest);

// Volvemos en 21:45 args !!!