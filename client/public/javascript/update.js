// Update an existed pokimon if even exist
$(document).ready(function(){
    $('#updatePokemon').click(function(){
      if($('#pokemonHealth').val()<0||$("#pokemonFood").val().length===0||$("#pokemonName").val().length===0){
        alert("Something went wrong with the information!");
      }
      else{
          let tempName=$("#pokemonName").val();
          let tempHealth=$("#pokemonHealth").val();
          let tempFood=$("#pokemonFood").val();
          $.get(`http://localhost:3000/updatePokemon?name=${tempName}&health=${tempHealth}&food=${tempFood}`,function(err,result){
            if(err) alert("Something went wrong!");
            else{alert("Pokemon has been updated! if even existed")};
          });
      }
    });

       
      $("#go-home").click(function(){
        $.get('http://localhost:3000/').then((res)=>{
            console.log(res);
        });
      });
  });