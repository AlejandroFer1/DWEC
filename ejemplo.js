//esto es un comentario de una linea

/*esto es un comentario de dos linesa

*/

let nombre = "Juan";
console.log(nombre); //imprime en consola el valor de la variable nombre
nombre = 2;
console.log(nombre); //imprime en consola el valor de la variable nombre

console.log("Se ha registrado el usuario " + nombre); //imprime en consola el texto Hola mundo

console.info("Se ha registrado el usuario " + nombre); //imprime en consola el texto Hola mundo

console.warn("Se ha registrado el usuario " + nombre); //imprime en consola el texto Hola mundo

console.error("Se ha registrado el usuario " + nombre); //imprime en consola el texto Hola mundo

function add(a, b) {
  debugger; // La ejecución se detendrá aquí
  //si las herramientas de desarrollo están abiertas
  return a + b;
}
console.log(add(2, 3));