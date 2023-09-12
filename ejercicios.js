/**
 * Ejercicio 1: Promesas Encadenadas
 */

function aleatorio(){
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve(Math.floor(Math.random() * 100))
        }, 2000);
    })
};
function aleatorio2(num){
    return new Promise((resolve, reject) => {
        setTimeout(()=> resolve(num * num), 3000);
    })
};
function aleatorio3(num){
    return new Promise((resolve, reject) => {
        setTimeout(()=> resolve(Math.sqrt(num)), 1000);
    })
};

aleatorio()
.then( result => {
    console.log("Numero aleatorio: ",result);
    aleatorio2(result).then( result2 => {
        console.log("Numero al cuadrado: ",result2);
        aleatorio3(result2).then( result3 => {
            console.log("Raíz cuadrada del numero",result3);
        })
    })
})
.catch(error => {
    console.log(error);
})

//------------------------------------------------------------------------

/**
 * Ejercicio 2: Promesa de Múltiples Solicitudes
 */

function obtenerArrays(array){
    return new Promise( (resolve, reject ) => {
        let response =[];
        array.forEach(url => {
            fetch(url).then(data=> data.json()).then(result=>response.push(result))
        });
        resolve(response);
    })
}
 let urls = ["https://pokeapi.co/api/v2/pokemon/","https://pokeapi.co/api/v2/move/","https://pokeapi.co/api/v2/type/"]
obtenerArrays(urls)
.then(result => {
    console.log(result);
})