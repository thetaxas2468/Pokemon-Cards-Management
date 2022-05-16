// Using jquery and client ask server to add pokimon to the data base
$(document).ready(function(){
    $("#addPokemonButton").click(function(){
        if($('#pokemonHealth').val()<0||$("#pokemonFood").val().length==0||$("#pokemonName").val().length==0){
            alert("Something went wrong with the informations!");
        }
        else{
            let tempName=$("#pokemonName").val();
            let tempHealth=$("#pokemonHealth").val();
            let tempFood=$("#pokemonFood").val();
            $.get(`http://localhost:3000/addPok?name=${tempName}&health=${tempHealth}&food=${tempFood}`,function(err,result){
                if(err) alert("Something went wrong!");
                else{alert("Pokemon has been added to the list!")};
            });
        }
    });
});