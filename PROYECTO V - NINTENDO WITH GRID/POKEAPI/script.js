window.onload = () =>{
    const URL = "https://pokeapi.co/api/v2/pokemon/1/"
    let printToDom = (data) => {
        let divContainer = document.getElementById('container')
        let obj = {}
        obj.id = data.id
        obj.name = data.name
//        obj.types = data.types[0].name
        obj.types = data.types.map(item=>item.type.name).join(', ')
        obj.img = data.sprites.front_shiny
        let pokemonDiv = document.createElement('div')
        pokemonDiv.classList.add("card_pkm")
        let innerTags = `<p>id: ${obj.id}</p>
                         <h2>Nombre: ${obj.name}</h2>
                         <h3>Tipos: ${obj.types}</h3>
                         <img src="${obj.img}"/>`
            pokemonDiv.innerHTML = innerTags
            divContainer.appendChild(pokemonDiv)
/*         let idP = document.createElement("p")
        idP.innerText  = obj.id
        pokemonDiv.appendChild(idP)
        let h2Name = document.createElement("h2")
        h2Name.innerText = obj.name
        pokemonDiv.appendChild(h2Name)
        let h3Types = document.createElement("h3")
        h3Types.innerText = obj.types
        pokemonDiv.appendChild(h3Types)
        let imgPokemon = document.createElement("img")
        imgPokemon.src = obj.img
        divContainer.appendChild(pokemonDiv) */

    }

    let getPokemons = () => {
        let arrayPromise = []
        for (let id = 1 ; id < 151; id++){
       
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}`

         arrayPromise.push(fetch(URL).then(res=>res.json()))
       
    }
    Promise.all(arrayPromise).then((datos) =>{
        console.log(datos)
        for(let poke of datos){
        printToDom(poke)
    }
    }).catch((error)=>{
        console.log('algo ha salido mal',error)
    })
    }

    getPokemons()
}
