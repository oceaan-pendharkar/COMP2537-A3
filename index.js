const setup = async () => {
    console.log("Hello World");

    const result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=810");

    const pokemons = result.data.results;


    //display total number of pokemons
    $("#totalPokemons").text(pokemons.length);

    let allTypes = [];
    let allPokemons = [];

    // for all pokemons, get their type and add to allTypes
    for (let i = 0; i < pokemons.length; i++) {
        const pokemonResult = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemons[i].name}`);
        const types = pokemonResult.data.types.map((type) => {
            return type.type.name;
        });
        allTypes = allTypes.concat(types);

        //create an array of all pokemons with their types
        allPokemons.push({
            id: pokemonResult.data.id,
            name: pokemons[i].name,
            types: types,
            abilities: pokemonResult.data.abilities.map((ability) => {
                return ability.ability.name;
            },
            ),
            stats: pokemonResult.data.stats.map((stat) => {
                return stat.stat.name;
            }
            )
        });
    }

    console.log(allPokemons);
    //remove duplicates from allTypes
    allTypes = [...new Set(allTypes)];




    for (let i = 0; i < pokemons.slice(0, 10).length; i++) {
        // pokemons.forEach(async (pokemon, index) => {
        pokemon = pokemons[i];
        index = i;
        //get current pokemon's data
        const pokemonResult = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);


        $("#main").append(`
            <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${pokemon.name}">
                        More
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal${pokemon.name}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">${pokemon.name}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <h1>Abilities</h1>
                                    <ul id="${pokemonResult.data.id}Abilities">
                                    </ul>
                                    <h1>Stats</h1>
                                    <ul id="${pokemonResult.data.id}Stats">
                                    </ul>
                                    <h1>Types</h1>
                                    <ul id="${pokemonResult.data.id}Types">
                                    </ul> 
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    `);



        //create an array of abilities for specific pokemon
        const abilities = pokemonResult.data.abilities.map((ability) => {
            return ability.ability.name;
        }
        );

        // console.log(pokemonResult, abilities)

        //create an array of stats
        const stats = pokemonResult.data.stats.map((stat) => {
            return stat.stat.name;
        }

        );

        //create an array of types
        const types = pokemonResult.data.types.map((type) => {
            return type.type.name;
        }
        );



        //display abilities
        abilities.forEach((ability) => {
            $(`#${pokemonResult.data.id}Abilities`).append(`
            <li>${ability}</li>
        `);

        }
        );

        //display stats
        stats.forEach((stat, index) => {
            $(`#${pokemonResult.data.id}Stats`).append(`
            <li>${stat}: ${pokemonResult.data.stats[index].base_stat}</li>
        `);

        }
        );

        //display types
        types.forEach((type) => {
            $(`#${pokemonResult.data.id}Types`).append(`
            <li>${type}</li>
        `);

        }
        );

    };

    //make a checkbox for each type in #checkboxes
    allTypes.forEach((type) => {
        $("#checkboxes").append(`
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${type}" id="${type}">
        <label class="form-check-label" for="${type}">
        ${type}
        </label>
        </div>
        `);
    });

    //add event listener to checkboxes
    $("#checkboxes input").on("click", async (event) => {
        //empty the main div
        $("#main").empty();

        //get the checked checkboxes
        const checkedCheckboxes = $("#checkboxes input:checked");

        //get the values of the checked checkboxes
        const checkedCheckboxesValues = [];
        for (let i = 0; i < checkedCheckboxes.length; i++) {
            checkedCheckboxesValues.push(checkedCheckboxes[i].value);
        }
        console.log(checkedCheckboxesValues);

        const filteredPokemons = allPokemons.filter((pokemon) => {
            //check if the pokemon has all the types in checkedCheckboxesValues
            return checkedCheckboxesValues.every((type) => {
                return pokemon.types.includes(type);
            }
            );
        }
        );

        //display number of pokemons displayed
        $("#totalPokemons").text(filteredPokemons.length);

        let pokemonsToDisplay;
        if (filteredPokemons.length > 10) {
            pokemonsToDisplay = 10;
        } else {
            pokemonsToDisplay = filteredPokemons.length;
        }

        //display number of pokemons per page
        $("#displayedPokemons").text(pokemonsToDisplay);

        //display all filtered pokemons
        for (let i = 0; i < 10; i++) {
            // pokemons.forEach(async (pokemon, index) => {
            let pokemon = filteredPokemons[i];
            let index = i;
            //get current pokemon's data

            $("#main").append(`
            <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${pokemon.name}">
                        More
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal${pokemon.name}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">${pokemon.name}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <h1>Abilities</h1>
                                    <ul id="${pokemon.id}Abilities">
                                    </ul>
                                    <h1>Stats</h1>
                                    <ul id="${pokemon.id}Stats">
                                    </ul>
                                    <h1>Types</h1>
                                    <ul id="${pokemon.id}Types">
                                    </ul> 
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    `);

            //populate the pokemon's attributes
            $(`#${pokemon.id}Abilities`).empty();
            $(`#${pokemon.id}Stats`).empty();
            $(`#${pokemon.id}Types`).empty();

            //display abilities
            pokemon.abilities.forEach((ability) => {
                $(`#${pokemon.id}Abilities`).append(`
            <li>${ability}</li>
        `);
            });

            //display stats
            pokemon.stats.forEach((stat, index) => {
                $(`#${pokemon.id}Stats`).append(`
            <li>${stat}: ${pokemon.stats[index].base_stat}</li>
        `);
            });

            //display types
            pokemon.types.forEach((type) => {
                $(`#${pokemon.id}Types`).append(`
            <li>${type}</li>
        `);
            });


        }

    });



    //get the 81 buttons
    const PAGE_SIZE = 10;
    const numberOfBUttons = Math.ceil(pokemons.length / PAGE_SIZE);

    //display all buttons
    for (let i = 0; i < numberOfBUttons; i++) {
        $("#paginationControls").append(`
            <button type="button" class="btn btn-primary" id="button${i}">${i + 1}</button>
        `);
    }

    //add hidden class to buttons 6-81
    for (let i = 5; i < numberOfBUttons; i++) {
        $(`#button${i}`).addClass("hidden");
    }


    //display number of pokemons per page
    $("#displayedPokemons").text(PAGE_SIZE);


    //add event listeners to the buttons
    $("#paginationControls button").on("click", async (event) => {
        console.log("event handler")        //empty the main div
        $("#main").empty();


        if (event.target.innerText == 1) {
            //hide previous button
            $("#prev").addClass("hidden")
        } else {
            $("#prev").removeClass("hidden");

            //hide all buttons except current button
            for (let i = 0; i < numberOfBUttons; i++) {
                if (i != parseInt(event.target.innerText) - 1) {
                    $(`#button${i}`).addClass("hidden");
                }
            }

            //remove hidden class from event.target.innerText - 2 to event.target.innerText + 2
            for (let i = parseInt(event.target.innerText) - 3; i < parseInt(event.target.innerText) + 2; i++) {
                if (i >= 0 && i < numberOfBUttons) {
                    $(`#button${i}`).removeClass("hidden");
                }
            }


        }

        if (event.target.innerText == numberOfBUttons) {
            $("#next").addClass("hidden");
        } else {
            $("#next").removeClass("hidden");
        }

        //change the active button's colour
        $("#paginationControls button").removeClass("highlight");
        $("#paginationControls button").addClass("btn-primary");
        $(event.target).removeClass("btn-primary");
        $(event.target).addClass("highlight");


        const startIndex = (event.target.innerText - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;


        const slicedPokemons = pokemons.slice(startIndex, endIndex);
        // console.log(slicedPokemons);
        // console.log(startIndex);
        for (let i = 0; i < slicedPokemons.length; i++) {
            // pokemons.forEach(async (pokemon, index) => {
            let pokemon = slicedPokemons[i];
            let index = i;
            //get current pokemon's data
            const pokemonResult = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);


            $("#main").append(`
            <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1 + startIndex}.png" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${pokemon.name}">
                    More
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal${pokemon.name}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">${pokemon.name}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    ${pokemonResult.data.id}
                                    <h1>Abilities</h1>
                                    <ul id="abilities">
                                    </ul>
                                    <h1>Stats</h1>
                                    <ul id="stats">
                                    </ul>
                                    <h1>Types</h1>
                                    <ul id="types">
                                    </ul> 
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    `);

            //create an array of abilities
            const abilities = pokemonResult.data.abilities.map((ability) => {
                return ability.ability.name;
            });

            //create an array of stats
            const stats = pokemonResult.data.stats.map((stat) => {
                return stat.stat.name;
            });

            //create an array of types
            const types = pokemonResult.data.types.map((type) => {
                return type.type.name;
            });

            //display abilities
            abilities.forEach((ability) => {
                $("#abilities").append(`
            <li>${ability}</li>
        `);

            });
        };


    });

    //add event listener to the next button
    $("#next").on("click", async (event) => {
        //get id of the current active button
        const activeButton = $(".highlight").attr("id");

        if (!activeButton) {
            $(`#button1`).trigger("click");
            return;
        }

        //get the number of the current active button
        const activeButtonNumber = parseInt(activeButton.slice(6));

        console.log(activeButtonNumber);
        //empty the main div
        $("#main").empty();

        //trigger the event handler for the id of the current active button
        $(`#button${activeButtonNumber + 1}`).trigger("click");


    });

    //add event listener to the previous button
    $("#prev").on("click", async (event) => {
        //get id of the current active button
        const activeButton = $(".highlight").attr("id");

        if (!activeButton) {
            $(`#button79`).trigger("click");
            return;
        }

        //get the number of the current active button
        const activeButtonNumber = parseInt(activeButton.slice(6));

        console.log(activeButtonNumber);
        //empty the main div
        $("#main").empty();

        //trigger the event handler for the id of the current active button
        $(`#button${activeButtonNumber - 1}`).trigger("click");
    });
};




$(document).ready(setup);
