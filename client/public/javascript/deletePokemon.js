// deleting an existed pok from the database by the help of the server
$(document).ready(function(){
  $('#deletePokemon').click(function(){
      if($("#pokemonName").val().length===0){
        console.log($('#pokemonName').val())
        alert("Something went wrong with the information!");
    }
    else{
        let tempName=$("#pokemonName").val();
        $.get(`http://localhost:3000/deletePokemon?name=${tempName}`,function(err,result){
            if(err) alert("Something went wrong!");
            else{alert("Pokemon has been deleted! if even existed ")};
        });
    }
  });

     
    $("#go-home").click(function(){
      $.get('http://localhost:3000/').then((res)=>{
          console.log(res);
      });
    });
});