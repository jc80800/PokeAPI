function fetchPokemon(){
    for(let i = 1; i < 151; i++){
        searchPokemon(i);
    }
}

function createCard(data){
    const container = document.querySelector('#pokemonContainer');
    const element = document.createElement('div');
    const name = document.createElement('h1');
    const id = document.createElement('p');
    const img = document.createElement('img');
    img.src = `${data.sprites.front_default}`
    element.appendChild(img);
    name.innerHTML = data.name;
    id.innerHTML = data.id;
    element.appendChild(name);
    element.appendChild(id);
    
    container.appendChild(element)
}

function searchPokemon(id) {
    const BASE_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(BASE_URL)
        .then(res => res.json())
        .then(data => createCard(data));
}

fetchPokemon()

