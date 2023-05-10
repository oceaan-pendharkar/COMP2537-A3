const setup = async () => {
    console.log("Hello World");

    const result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=810");

    const pokemons = result.data.results;

    //display total number of pokemons
    $("#totalPokemons").text(pokemons.length);



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
                    <a href="#" class="btn btn-primary">Go somewhere</a>

                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${pokemon.name}">
                        Launch demo modal
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
                                    <ul id="modalList">
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
    };

    //get the 81 buttons
    const PAGE_SIZE = 10;
    const numberOfBUttons = Math.ceil(pokemons.length / PAGE_SIZE);
    for (let i = 0; i < numberOfBUttons; i++) {
        $("#paginationControls").append(`
            <button type="button" class="btn btn-primary" id="button${i}">${i + 1}</button>
        `);
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
        console.log(slicedPokemons);
        console.log(startIndex);
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
                    <a href="#" class="btn btn-primary">Go somewhere</a>

                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${pokemon.name}">
                        Launch demo modal
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
                                    <ul id="modalList">
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
        };


    });


};




$(document).ready(setup);
