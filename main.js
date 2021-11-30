const pokemonGrid = document.querySelector(".poke-grid");
const infoGrid = document.querySelector(".poke-info");

function listPokemon() {
    for (let i = 10; i < 60; i++) {
        getPokemon(i);
    }
}

function getInput() {
    var inputVal = document.querySelector("#pokemon");
    var appended = pokemonGrid.querySelectorAll("div");
    for (let i = 0; i < appended.length; i++) {
        pokemonGrid.removeChild(appended[i]);
    }
    (inputVal.value) ? getPokemon(inputVal.value) : listPokemon();
}

function getPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => { createPokemon(data, id) })
        .catch((error) => { errorMessage() });
}

function createPokemon(pokemon, id) {
    var card = document.createElement("div");
    card.classList.add("poke-card");
    card.setAttribute("id", id)

    var pokeImg = document.createElement("img");
    pokeImg.src = pokemon.sprites.front_default;

    var pokeName = document.createElement("p");
    pokeName.innerHTML = pokemon.name;

    card.appendChild(pokeImg);
    card.appendChild(pokeName);
    pokemonGrid.appendChild(card);

    if (id == 59) {
        getListener();
    }
}

function errorMessage() {
    var errorDiv = document.createElement("div");
    errorDiv.classList.add("error")
    var error = document.createElement("h2");
    error.innerText = "We could not find any Pokemon. MaKe sure you wrote the name or id right"

    errorDiv.appendChild(error)
    pokemonGrid.appendChild(errorDiv)
}

listPokemon()

function getListener() {
    var allCards = document.querySelectorAll(".poke-card");
    allCards.forEach((scard, index) => {
        scard.addEventListener('click', e => {
            scard.getAttribute("id");
            pokemonInfo(scard);
        })
    })

}

function pokemonInfo(id) {

}