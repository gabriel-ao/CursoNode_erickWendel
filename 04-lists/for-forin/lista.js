//https://www.hackerrank.com/challenges/simple-array-sum/problem

async function main() {
  try {
    //4, 5, 6, 7, 8, 9, 10
    const listaNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // map
    console.log("///////////////////////////////////");
    const impar = listaNumeros.map((item) => item % 2 !== 0);
    console.log("lista impar map: ", impar);
    console.log("///////////////////////////////////");

    const par = listaNumeros.map((item) => item % 2 === 0);
    console.log("lista par map: ", par);
    console.log("///////////////////////////////////");

    // filter
    const listImpares = listaNumeros.filter((impar) => impar % 2 !== 0);
    console.log("lista impares filter: ", listImpares);

    const listPares = listaNumeros.filter((par) => par % 2 === 0);
    console.log("lista pares filter: ", listPares);

    console.log("///////////////////////////////////");
    // filter verificação
    const num = 8;
    const existNumero = listaNumeros.filter((item) => item === num);
    const confImparPar = existNumero.map((item) => item % 2 !== 0);

    console.log("o numero existe: ", existNumero, "e ele é: ", confImparPar);

    //reduce
    const total = listaNumeros.reduce((numeros, numero) => {
      return numeros + numero;
    }, 0);

    const totalImpar = listImpares.reduce((impares, impar) => {
      return impares + impar;
    }, 0);

    const totalPar = listPares.reduce(function (pares, par) {
      return pares + par;
    }, 0);
    console.log("///////////////////////////////////");
    console.log("total impar: ", totalImpar);
    console.log("total par: ", totalPar);

    console.log("total reduce: ", total);
    console.log("///////////////////////////////////");
  } catch (error) {
    console.log("erro ->", error);
  }
}

main();
