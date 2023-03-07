const suma = (...nums) => {
    if(nums.length === 0) return 0
    if(nums.some(num => typeof num !== "number")) return null

    return nums.reduce((suma, num) => suma + num)
}

let testPASSED = 0
const testTOTAL = 4
console.log("Test 1: La funcion debe devolver null si algun parametro no es numerico");
const resultTest1 = suma("2", 2)
if(resultTest1 === null) {
    console.log("Test 1: PASS");
    testPASSED++
}
else console.log(`Test 1: NO PASS. Se reicibio ${typeof resultTest1}, y se esperaba null`);


console.log("Test 2: La funcion debe devolver 0 si no se pasa ningun parametro");
const resultTest2 = suma()
if(resultTest2 === 0) {
    console.log("Test 2: PASS");
    testPASSED++
}
else console.log(`Test 2: NO PASS. Se reicibio ${typeof resultTest2}, y se esperaba 0`);


console.log("Test 3: La funcion debe resolver la suma correctamente");
const resultTest3 = suma(2, 3)
if(resultTest3 === 5) {
    console.log("Test 3: PASS");
    testPASSED++
}
else console.log(`Test 3: NO PASS. Se recibio ${typeof resultTest3}, y se esperaba 5`);


console.log("Test 4: La funcion debe resolver la suma para cualquier cantidad de numeros");
const resultTest4 = suma(2, 3, 5, 8)
if(resultTest4 === 18) {
    console.log("Test 4: PASS");
    testPASSED++
}
else console.log(`Test 4: NO PASS. Se recibio ${typeof resultTest4}, y se esperaba 18`);




console.log(`Se pasaron ${testPASSED} tests de un total de ${testTOTAL}`);