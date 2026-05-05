// EJERCICIO 001
function isPrimo(num) {
    if (num <= 1) {
        return false
    }
    else if (num == 2) {
        return true
    }
    else if (num % 2 == 0){
        return false
    }

    const limiote = Math.floor(Math.sqrt(num));
    for (let i = 3; i <= limiote; i += 2){
        if (num % i === 0) {
            return false
        }
    }
    return true
}



// EJERCICIO 2
function isBisiesto(year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
}


// EJERCICIO 3
function calculadora (numA, numB, operacion) {
    let resultado;
    switch (operacion) {
        case '+':
            resultado =  numA + numB
            break;
        case '-':
            resultado = numA - numB
            break;
        case '*':
            resultado =  numA * numB
            break;
        case '/':
            resultado = (numB !== 0) ? numA / numB : "No puede dividir entre cero !";
            break;
        default:
            resultado = "Opercion invalida"
    }
    return (typeof resultado === "number")? `El resultado de ${numA} ${operacion} ${numB} es ${resultado}`: resultado
}



// EJERCICIO 004
function isPalindromo(num){
    let result = num.toString() === num.toString().split('').reverse().join('')
    return (result)? "Es palindromo": "No es palindromo"
}


// EJERCICIO 005
function fibonacci(n) {
  let serie = [0, 1];

  for (let i = 2; i < n; i++) {
    serie[i] = serie[i - 1] + serie[i - 2];
  }

  return serie.slice(0, n);
}

// EJERCICIO 6 
function mcd (numA, numB) {
    let residuo = numA % numB
    while (residuo !== 0) {
        numA = numB
        numB = residuo
        residuo = numA % numB
    }
    return  numB
}


// EJERCICIO 007
function patronPiramidal(num) {
    let arbol = "";
    for (let i = 1; i <= num; i++) {
        arbol += "*".repeat(i) + "\n";
    }
    return arbol;
}

// EJERCICIO 008
function piramideInvertida(num) {
    let arbol = "";
     for (let i = 0; i < num; i++) {
        arbol += " ".repeat(i) + "*".repeat(2 * (num - i) - 1) + "\n";
    }
    return arbol;
}

// EJERCICIO 009
function eliminarDuplicados(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i])
        }
    }
    return result
}



// EJERCICIO 010
function bubbleSort(arr) {
    let n = arr.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        n--;
    } while (swapped);

    return arr;
}



// EJERCICIO 011
function segundoMayor(arr) {
    let mayor = -Infinity;
    let segundoMayor = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > mayor) {
            segundoMayor = mayor;
            mayor = arr[i];
        } else if (arr[i] > segundoMayor && arr[i] !== mayor) {
            segundoMayor = arr[i];
        }
    }

    return segundoMayor;
}


// EJERCICIO 012
function parConSuma(arr, suma) {
    let vistos = new Set();

    for (let i = 0; i < arr.length; i++) {
        let complemento = suma - arr[i];
        if (vistos.has(complemento)) {
            return [complemento, arr[i]];
        }
        vistos.add(arr[i]);
    }

    return "NO hay numeros que cumplan con la condicion";
}


// EJERCICIO 013
function rotarArray(arr, k) {
    k = k % arr.length;
    return arr.slice(-k).concat(arr.slice(0, -k));
}


// EJERCICIO 014
function palabraMasLarga(arr) {
    let masLarga = "";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > masLarga.length) {
            masLarga = arr[i];
        }
    }
    return masLarga;
}


// EJERCICIO 015
function simularLogin() {
    const readline = require("readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const preguntar = (texto) => new Promise((resolve) => rl.question(texto, resolve));

    const userCorrecto = "admin";
    const passCorrecto = "1234";
    let intentos = 0;
    let acceso = false;

    (async () => {
        while (intentos < 3 && !acceso) {
            let userInput = await preguntar("Usuario: ");
            let passInput = await preguntar("Password: ");

            if (userInput === userCorrecto && passInput === passCorrecto) {
                acceso = true;
                console.log("Acceso concedido");
            } else {
                intentos++;
                console.log(`Usuario o contraseña incorrectos. Intentos restantes: ${3 - intentos}`);
            }
        }

        if (!acceso) {
            console.log("Cuenta bloqueada");
        }

        rl.close();
    })();
}

// EJERCICIO 016
function separarNumeros(arr) {
    let pares = [];
    let impares = [];
    let multiplosDe5 = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            pares.push(arr[i]);
        }
        if (arr[i] % 2 !== 0) {
            impares.push(arr[i]);
        }
        if (arr[i] % 5 === 0) {
            multiplosDe5.push(arr[i]);
        }
    }

    return { pares, impares, multiplosDe5 };
}


// EJERCICIO 017
function busquedaBinaria(arr, target) {
    let izquierda = 0;
    let derecha = arr.length - 1;

    while (izquierda <= derecha) {
        let medio = Math.floor((izquierda + derecha) / 2);

        if (arr[medio] === target) {
            return medio;
        } else if (arr[medio] < target) {
            izquierda = medio + 1;
        } else {
            derecha = medio - 1;
        }
    }

    return -1;
}


// EJERCICIO 18
function fibonacciRecursivo(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    let serie = fibonacciRecursivo(n - 1);
    serie.push(serie[serie.length - 1] + serie[serie.length - 2]);
    return serie;
}


// EJERCICIO 19
function invertirString(str) {
    if (str === "") return "";
    return invertirString(str.slice(1)) + str[0];
}


// EJERCICIO 20
function sumaDigitos(num) {
    if (num === 0) return 0;
    return (num % 10) + sumaDigitos(Math.floor(num / 10));
}

module.exports = { isPrimo, isBisiesto, calculadora, isPalindromo,
    fibonacci, mcd, patronPiramidal, piramideInvertida, bubbleSort,
    eliminarDuplicados, segundoMayor, parConSuma, rotarArray, palabraMasLarga, separarNumeros, busquedaBinaria, simularLogin,
    fibonacciRecursivo, invertirString, sumaDigitos}
