async function fetchPokemon(){
    for(let i = 1; i < 151; i++){
        await searchLegendaryPokemon(i);
    }
}

async function searchLegendaryPokemon(id) {
    const BASE_URL = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    await fetch(BASE_URL)
        .then(res => res.json())
        .then(data => checkType(data, id))
        .catch(error => console.log("Error"));
}

async function checkType(data, id){
    if(data.is_legendary){
        await searchPokemon(id);
    } else {console.log("Not legendary")}
}


function createCard(data, id){
    const col = document.createElement('div');
    col.className = "col s4";

    const card = document.createElement('div');
    card.className = "card";

    const cardImage = document.createElement('img');
    cardImage.src = data.sprites.front_default;
    
    const cardTitle = document.createElement('span');
    cardTitle.className = "card-title";

    const cardTitleColor = document.createElement('span');
    cardTitleColor.className = "cardTitleColor";
    cardTitleColor.innerHTML = data.name;

    const cardContent = document.createElement('div');
    cardContent.className = "card-content"

    const pokeId = document.createElement('h2');
    pokeId.innerHTML = id;

    cardContent.appendChild(pokeId);

    data.types.forEach(element => {
        const type = element.type.name;
        const info = document.createElement('p');
        info.innerHTML = type;
        cardContent.appendChild(info);
    })

    col.appendChild(card);
    card.appendChild(cardImage);
    card.appendChild(cardTitle)
    cardTitle.appendChild(cardTitleColor);
    card.appendChild(cardContent);

    document.querySelector('#pokemonContainer').lastElementChild.appendChild(col);
}

function createDiv(data, id){
    const container = document.querySelector('#pokemonContainer');

    if ((id % 3) === 1){
        const row = document.createElement('div');
        row.className = "row";
        container.appendChild(row);
        createCard(data, id);
    }

    else{
        createCard(data, id);
    }

}


async function searchPokemon(id) {
    const BASE_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    await fetch(BASE_URL)
        .then(res => res.json())
        .then(data => createDiv(data, id))
        .catch(error => console.log("Error"));
}

fetchPokemon();

$( document ).ready(function() {
    $(".dropdown-trigger").dropdown({ hover: false });
});

