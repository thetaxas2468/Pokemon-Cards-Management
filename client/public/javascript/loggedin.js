console.log("Welcome to the home page of pokemons have fun!");
$(document).ready(function() {
    $('#logout').on('click',function(){
        $.get("http://localhost:3000/logOut",(err,res)=>{
            if(err) throw err;
            })
        window.location.replace("http://localhost:3000/");
    }) 
});