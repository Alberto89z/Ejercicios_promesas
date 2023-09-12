/**
 * Ejercicio 1: Promesas Encadenadas
 */

function aleatorio() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 100));
    }, 2000);
  });
}
function aleatorio2(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num * num), 3000);
  });
}
function aleatorio3(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(Math.sqrt(num)), 1000);
  });
}

aleatorio()
  .then((result) => {
    console.log("Numero aleatorio: ", result);
    aleatorio2(result).then((result2) => {
      console.log("Numero al cuadrado: ", result2);
      aleatorio3(result2).then((result3) => {
        console.log("Raíz cuadrada del numero", result3);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });


/**
 * Ejercicio 2: Promesa de Múltiples Solicitudes
 */

function getUrl(url) {
  return new Promise((resolve, reject) => {
    let res = []
    url.forEach(u => {
        fetch(u)
        .then((data) => data.json())
        .then((result) => res.push(result))
        .catch(error => reject(error));
    });
    resolve(res)
  });
}
let urls = [
  "https://pokeapi.co/api/v2/pokemon/",
  "https://pokeapi.co/api/v2/move/",
  "https://pokeapi.co/api/v2/type/",
];

getUrl(urls)
.then(result => console.log(result)).catch(error => console.log(error))

/**
 * Ejercicio 3: Promesas Paralelas
 */

let funciones = [aleatorio,aleatorio2]
function promesasParalelas(funciones){
    return new Promise.all(funciones)
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

/**
 * Ejercicio 4: Promesas en Cadena con Retraso
 */
function numeroConRetraso(n){
    return new Promise( (resolve, reject) => {
        const promesas = []
        for (let i = 1; i <= n; i++) {
            promesas.push(
                new Promise( (resolve, reject) => {
                    setTimeout(() => {
                        console.log("Numero: ", n);
                        resolve(n);
                    },i * 1000);
                })
            )
        }
        setTimeout(() => {
                resolve ("Todas las promesas se resolvieron")
        },n*1000);
    } )
}

console.log(numeroConRetraso(2));
numeroConRetraso(2).then(res => console.log(res)).catch(err => console.log(err))


/**
 * Ejercicio 5: Promesa con Cancelación
 */
function promesaConTiempo(flag){
    var cancelar ;
    
    const promise = new Promise ((resolve, reject) => {

        const tiempoPromesa = setTimeout(() => {
            if (!cancelar) {
                resolve("Promesa cumplida")
            }
        }, 5000);

        const cancel = () => {
            flag = true;
            clearTimeout(tiempoPromesa)
            reject("Promesa cancelada")
        }

        if(flag) {
            cancel()
        }
    })
    
    return promise;
}

const ejercicio5 = promesaConTiempo() //se recibe cualquier parametro (true o un número) para indicar un cancelamiento
ejercicio5.then(res => console.log(res)).catch(err => console.log(err))
