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
    var appendedInfo2 = infoGrid.querySelector(".poke-card");
    if (appendedInfo2.childNodes.length>0) {
        var appendedImg = appendedInfo2.querySelector("img");
        appendedInfo2.removeChild(appendedImg);
        var appendedInfo3 = infoGrid.querySelector(".poke-content");
        var childH =appendedInfo3.querySelector("h2")
        var childUl =appendedInfo3.querySelector("ul")
    
        appendedInfo3.removeChild(childH);
        appendedInfo3.removeChild(childUl);
    }

    (inputVal.value != "")? getPokemon(inputVal.value) : listPokemon();
    document.querySelector("section").classList.remove("translate")
}

function getPokemon(id, info) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => { 
            (info==1)? pokemonInfo(data) : createPokemon(data, id) })
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
            const inf = 1;
            getPokemon(scard.id, inf);
            console.log(scard.id)
        })
    })

}

function pokemonInfo(pokemon) {
    var sect = document.querySelector("section");
    sect.classList.add("translate")

    var infoContainer = document.querySelector(".poke-info .poke-card");
    var pokeImg = document.createElement("img");
    pokeImg.src = pokemon.sprites.front_default;

     var content = document.querySelector(".poke-content")
     var pokeName = document.createElement("h2");
     pokeName.innerHTML = pokemon.name;

     var list = document.createElement("ul");
     var items = [`Weight : ${pokemon.weight}`, `Ability : ${pokemon.abilities[0].ability.name}`, `Move : ${pokemon.moves[0].move.name}`, `Type : ${pokemon.types[0].type.name}`]

     for(let i=0; i<items.length; i++){
         var listItem = document.createElement("li");
         listItem.innerText = items[i]
         list.appendChild(listItem);
     }

     infoContainer.appendChild(pokeImg);
    content.appendChild(pokeName);
    content.appendChild(list)
}