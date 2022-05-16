// getting information about all pokimons from the data base
$(document).ready(function(){
    $('#info-button').click(function(){
      $.get('http://localhost:3000/getInfo').then((res)=>{
        let w=0;
        if(res.length===0){
          alert('Add pokemons because the list is empty!')
        }
        for(let ep of res){
          w++;  
          console.log(ep);
          let tempDiv=$('<div></div>'); 
          let h2Tempo=$(`<h2 class="d-flex justify-content-center">${w}</h2>`);
          tempDiv.append(h2Tempo);
          let tempDiv2=$('<div class="d-flex justify-content-center align-items-center mb-5"></div>'); 
          tempDiv.addClass('info-element');
          $(".info-element").css("background-color","red");
              for(const [key,value] of Object.entries(ep)){
                if(key==='_id'){
                  continue;
                }
                let h2Temp=$('<h2></h2>').html(`${key}:${value}`);
                tempDiv.append(h2Temp);
              }
            tempDiv2.append(tempDiv);
            $('#info-list').append(tempDiv2);
          }
        });
      });
      $("#go-home").click(function(){
        $.get('http://localhost:3000/').then((res)=>{
            console.log(res);
        })
      });
  })