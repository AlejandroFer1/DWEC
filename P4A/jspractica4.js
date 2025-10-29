fetch("./data/heros.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => procesarJSON(jsondata))
  .catch((e) => {
    console.log(e);
  });

function procesarJSON(jsondata) {
  //tu codigo aqui

  let plantilla = document.getElementById("plantilla");
  let contenedor = plantilla.parentNode;
  //contenedor.removeChild(plantilla);
  const heroes = jsondata.data.results;
  heroes.forEach((heroe) => {
    let tarjeta = plantilla.cloneNode(true);
    tarjeta.id = heroe.id;
    tarjeta.getElementsByClassName("card-title")[0].innerText = heroe.name;
    tarjeta.getElementsByClassName("card-text")[0].innerText =
      heroe.description || "Sin descripcion";
      tarjeta.getElementsByTagName("li")[0].innerText = "Comics: " + (heroe.comics.available> 0 ? heroe.comics.available : "No hay comics")
      tarjeta.getElementsByTagName("li")[1].innerText = "Series: " + (heroe.series.available > 0 ? heroe.series.available : "No hay series")
      tarjeta.getElementsByTagName("li")[2].innerText = "Eventos: " + (heroe.events.available > 0 ? heroe.events.available : "No hay eventos")
      tarjeta.getElementsByTagName("li")[3].innerText = "Historias: " + (heroe.stories.available  > 0 ? heroe.stories.available : "No hay historias")
       
    let imgURL =
      heroe.thumbnail.path + "." + heroe.thumbnail.extension;
    tarjeta.getElementsByClassName("card-img-top")[0].src = imgURL;
    contenedor.appendChild(tarjeta);
  });
  contenedor.removeChild(plantilla);

  /*


aqui metemos el codigo para crear las tarjetas de los heroes
*/

  /*

    Ahora crea un enlace al final del footer que permita descargar el HTML que has creado



  */
  const a = document.createElement("a");
  //cuidadiinn joorrlll, que estamos con un literal de cadena
  const archivo = new Blob(
    [
      `
      <!doctype html>
      <html lang="en">
      ` +
      document.head.outerHTML +
      `
    
    
    
    
      <!-- Todo lo que viene ahora lo has creado tu solit@ con javascript y jugando con el DOM
           y esto solo la punta del iceberg de todo lo que vas a crear!!!
           venga! vamos a por ello  -->
    
    
    
    
    
    
    
      ` +
      document.body.outerHTML +
      `
      </html>`,
    ],
    { type: "html" }
  );
  const url = URL.createObjectURL(archivo);
  a.href = url;
  a.download = "statico.html";
  a.innerHTML = "descarga el htlm que has creado con js y el dom";
  document.getElementsByTagName("footer")[0].appendChild(a);
}
