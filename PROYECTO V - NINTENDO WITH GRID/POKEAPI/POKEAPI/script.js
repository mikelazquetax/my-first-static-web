let globalVariable = [];
let onOff = true
window.onload = () => {
  //    const URL = "https://pokeapi.co/api/v2/pokemon/1/"

  let id = 0;
  bodyDoc = document.querySelector("body");
  let divContainer = document.createElement('div')
  divContainer.id = 'container'
  divContainer.classList.add('mainContainer')
  bodyDoc.appendChild(divContainer)


  bodyDoc.style.backgroundColor = 'black'


  let printToDom = (data) => {
    id = id + 1;
 /*    let divContainer = document.getElementById("container"); */

    let obj = {};
    obj.id = data.id;
    obj.name = data.name;
    //        obj.types = data.types[0].name
    obj.types = data.types.map((item) => item.type.name).join(", ");
    tipologia = data.types.map((item) => item.type.name);
    obj.img = data.sprites.front_shiny;
    obj.stats = data.stats.map((item) => {
      return item.estadisticas;
    });
    let pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("card_pkm");
    pokemonDiv.id = id;

    let idPoke = document.createElement("p");
    idPoke.id = id;
    idPoke.innerText = obj.id;

    pokemonDiv.appendChild(idPoke);

    let name = document.createElement("h2");
    name.innerText = obj.name;
    pokemonDiv.appendChild(name);

    let tipos = document.createElement("h3");
    tipos.innerText = obj.types;
    pokemonDiv.appendChild(tipos);

    /*         let innerTags = `
                         <h2>Nombre: ${obj.name}</h2>
                         <h3>Tipos: ${obj.types}</h3>
                         `
            pokemonDiv.innerHTML = innerTags */
    divContainer.appendChild(pokemonDiv);

    pic = document.createElement("img");

    pic.id = "foto" + id;
    pic.src = obj.img;
    pokemonDiv.appendChild(pic);

    clasesPokemon(tipologia, id);

    pokemonDiv.addEventListener("click", (event) => {
      idDivPulsado = event.currentTarget.id;
      onClick(idDivPulsado);
    });

  };


  


  botonFiltro = document.getElementById('filtro')
  botonFiltro.addEventListener("click", () =>{
    filtrar()
  })

  switchBoton = document.getElementById('switch')
  switchBoton.addEventListener("click", () =>{
   
  onOff =  nightMode(onOff)
  })

  let getPokemons = () => {
    let arrayPromise = [];
    for (let id = 1; id < 151; id++) {
      const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

      arrayPromise.push(fetch(URL).then((res) => res.json()));
    }
    Promise.all(arrayPromise)
      .then((datos) => {
        console.log(datos);
        globalVariable = datos;
        for (let poke of datos) {
          printToDom(poke);
        }
      })
      .catch((error) => {
        console.log("algo ha salido mal", error);
      });
  };

  getPokemons();
};

clasesPokemon = (tipologia, id) => {
  switch (tipologia[0]) {
    case "grass":
      hierba = document.getElementById("foto" + id);
      hierba.style.backgroundColor = "green";
      break;
    case "fire":
      fuego = document.getElementById("foto" + id);
      fuego.style.backgroundColor = "red";
      break;
    case "water":
      water = document.getElementById("foto" + id);
      water.style.backgroundColor = "blue";
      break;
    case "bug":
      bug = document.getElementById("foto" + id);
      bug.style.backgroundColor = "lightgreen";
      break;
    case "normal":
      normal = document.getElementById("foto" + id);
      normal.style.backgroundColor = "lightsalmon";
      break;
    case "poison":
      veneno = document.getElementById("foto" + id);
      veneno.style.backgroundColor = "purple";
      break;
    case "electric":
      electric = document.getElementById("foto" + id);
      electric.style.backgroundColor = "yellow";
      break;
    case "ground":
      ground = document.getElementById("foto" + id);
      ground.style.backgroundColor = "brown";
      break;
    case "fairy":
      hada = document.getElementById("foto" + id);
      hada.style.backgroundColor = "pink";
      break;
    case "fighting":
      lucha = document.getElementById("foto" + id);
      lucha.style.backgroundColor = "orange";
      break;
    case "psychic":
      psico = document.getElementById("foto" + id);
      psico.style.backgroundColor = "violet";
      break;
    case "rock":
      roca = document.getElementById("foto" + id);
      roca.style.backgroundColor = "gray";
      break;
    case "ghost":
      fant = document.getElementById("foto" + id);
      fant.style.backgroundColor = "fuchsia";
      break;
    case "dragon":
      fant = document.getElementById("foto" + id);
      fant.style.backgroundColor = "dodgerblue";
      break;
    case "ice":
      fant = document.getElementById("foto" + id);
      fant.style.backgroundColor = "cyan";
      break;
  }
};

let modal;
let onClick = async (idDivPulsado) => {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idDivPulsado}/`);
  let datospoke = await res.json();
  console.log(datospoke.stats);

  let datosElegido = datospoke.stats;

  if (modal !== undefined) {
    modal.remove();
  }

  modal = document.createElement("div");
  modal.classList.add("modal");
  bodyDoc.appendChild(modal);

  headerModal = document.createElement("div");
  headerModal.classList.add("modal-header");

  modal.appendChild(headerModal);

  titleModal = document.createElement("h3");
  titleModal.classList.add("title");
  titleModal.innerText = "Name : " + datospoke.species.name.toUpperCase();
  headerModal.appendChild(titleModal);

  buttonClose = document.createElement("button");
  buttonClose.innerText = "X";
  buttonClose.classList.add("modal-header");
  buttonClose.classList.add("close-button");

  headerModal.appendChild(buttonClose);

  buttonClose.addEventListener("click", () => {
    modal.remove();
  });

  for (estadisticas of datosElegido) {
    habilidad = document.createElement("p");
    habilidad.classList.add("habilidad");
    habilidad.innerText =
      estadisticas.stat.name[0].toUpperCase() +
      estadisticas.stat.name.slice(1) +
      " : " +
      estadisticas.base_stat;
    modal.appendChild(habilidad);
    modal.classList.add("active");
  }
};


function filtrar(){
  filtr = document.getElementById('tiposPokemon')
  valorFiltrado = filtr.value
  console.log(valorFiltrado)
  if(valorFiltrado == 'showMeAll'){
   window.location.reload()
  }else{
  let tiposSeleccionados = []
  for(value of globalVariable){
    if (value.types[0].type.name == valorFiltrado){
      tiposSeleccionados.push(value)
    }
  }
  console.log(tiposSeleccionados)
  let divContainer = document.getElementById('container')
  divContainer.remove()
  FilterInDom(tiposSeleccionados);
}
}



let FilterInDom = (data) => {
  let id = 0;
  bodyDoc = document.querySelector("body");
  let divContainer = document.createElement('div')
  divContainer.id = 'container'
  divContainer.classList.add('mainContainer')
  bodyDoc.appendChild(divContainer)
  
  for ( valor of data){

    id = id + 1;

  let obj = {};
  obj.id = valor.id;
  obj.name = valor.name;
  //        obj.types = data.types[0].name
  obj.types = valor.types.map((item) => item.type.name).join(", ");
  tipologia = valor.types.map((item) => item.type.name);
  obj.img = valor.sprites.front_shiny;
  obj.stats = valor.stats.map((item) => {
    return item.estadisticas;
  });
  let pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("card_pkm");
  pokemonDiv.id = valor.id;

  let idPoke = document.createElement("p");
  idPoke.id = id;
  idPoke.innerText = obj.id;

  pokemonDiv.appendChild(idPoke);

  let name = document.createElement("h2");
  name.innerText = obj.name;
  pokemonDiv.appendChild(name);

  let tipos = document.createElement("h3");
  tipos.innerText = obj.types;
  pokemonDiv.appendChild(tipos);


  divContainer.appendChild(pokemonDiv);

  pic = document.createElement("img");

  pic.id = "foto" + id;
  pic.src = obj.img;
  pokemonDiv.appendChild(pic);

  clasesPokemon(tipologia, id); 

  pokemonDiv.addEventListener("click", (event) => {
    idDivPulsado = event.currentTarget.id;
    onClick(idDivPulsado);
  });

}



}

function nightMode(onOff){

  if(onOff === true){
    onOff = false
    bodyDoc.style.backgroundColor = 'white'
  }else{
    onOff = true
    bodyDoc.style.backgroundColor = 'black'
  }

  return onOff
  }

