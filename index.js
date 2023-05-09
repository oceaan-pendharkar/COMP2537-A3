const setup = async () => {
    console.log("Hello World");

    const result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=810");

    const pokemons = result.data.results.slice;
    console.log(pokemons);


    //     pokemons.forEach((pokemon, index) => {
    //         $("#main").append(`
    //         <div class="card" style="width: 18rem;">
    //   <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png" alt="Card image cap">
    //   <div class="card-body">
    //     <h5 class="card-title">${pokemon.name}</h5>
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //     <a href="#" class="btn btn-primary">Go somewhere</a>

    //     <!-- Button trigger modal -->
    //     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    //         Launch demo modal
    //     </button>

    //     <!-- Modal -->
    //     <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    //         aria-hidden="true">
    //         <div class="modal-dialog" role="document">
    //             <div class="modal-content">
    //                 <div class="modal-header">
    //                     <h5 class="modal-title" id="exampleModalLabel">${pokemon.name}</h5>
    //                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //                         <span aria-hidden="true">&times;</span>
    //                     </button>
    //                 </div>
    //                 <div class="modal-body">
    //                     ...
    //                 </div>
    //                 <div class="modal-footer">
    //                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //   </div>
    // </div>
    //         `);
    //     });
    // }



    $(document).ready(setup);