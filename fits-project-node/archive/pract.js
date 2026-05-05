const { isPrimo, isBisiesto, calculadora, isPalindromo, fibonacci, mcd,
    patronPiramidal, piramideInvertida, eliminarDuplicados, bubbleSort,
    segundoMayor, parConSuma, rotarArray, palabraMasLarga, separarNumeros,
    busquedaBinaria, simularLogin, fibonacciRecursivo, invertirString, sumaDigitos} = require('./app/src/funtions.js')

function busquedalineal(arr, elemento) {
    for (let i=1; i < arr.length; i++) {
        if (arr[i] === elemento) {
            return i
        }
    }
    return -1
}

// const arreglo = [1,2,3,4,5,9,7, 8, 10]
// const elementobuscado = 5
// const indice = busquedalineal(arreglo, elementobuscado)
// console.log(`El elemento ${elementobuscado} se encuentra en el indice ${indice} del arreglo`)


// EJERCICIO 001
// console.log(isPrimo() ? "Es primo": "no es primo")


// EJERCICIO 002
// console.log(isBisiesto(204) ? "Es bisiesto": "no es bisiesto")


// EJERCICIO 003
// console.log(calculadora(8,4, "-"))

// EJERCICIO 004
// console.log(isPalindromo(121))


// EJERCICIO 005
// console.log(fibonacci(8))


// EJERCICIO 006
// console.log(mcm(32,64))


// EJERCIIO 007
// console.log(patronPiramidal(36))


// EJERCICIO 008
// console.log(piramideInvertida(4))

// EJERCICIO 009
// console.log(eliminarDuplicados([1, 2, 2, 3, 4, 4, 5,9, 9, 9, 6]))


// EJERCICIO 010
// console.log("Array ordenado:",bubbleSort([2, 3, 4, 4, 5,9, 9, 9, 6,0,1]))


// EJERCICIO 011
// console.log("Segundo mayor: ",segundoMayor([5, 10, 3, 10, 7,100]))


// EJERCICIO 012
// console.log(parConSuma([3, 5, 2, 8, 1], 6))


// EJERCICIO 0013
// console.log(rotarArray([1, 2, 3, 4, 5], 5))


// EJERCICIO 014
// console.log("Palabra mas grande es:",palabraMasLarga(["hola", "mundo", "test", "43", "2"]))


// EJERCICIO 015
// simularLogin()


// EJERCICIO 0016
// console.log(separarNumeros([1,2,3,4,5,10,15,20]))

// EJERCIIO 0017
// console.log("En Indice: ",busquedaBinaria([1,3,5,7,9,11], 1))


// EJERCICIO 018
// console.log(fibonacciRecursivo(4))


// EJERCICIO 019
// console.log(invertirString("Hola Mundo"))


// EJERCICIO 020
// console.log("la suma del digito es:", sumaDigitos(45))