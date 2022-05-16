// Sign up information to the database by the help of the server
$(document).ready(function() {
    let Login=false;
    function validateEmail(email) {
        let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return res.test(email);
      }
      function validate() {
        let templogin=true;
        let result = $("#result");
        let resultpass=$('#result-pass');
        let resultlogin=$('#result-login');
        let email = $("#email").val();
        let password=$('#password').val();
        result.text("");
        resultpass.text('');
        resultlogin.text('');
        if(validateEmail(email)) {
          result.text(email + " is valid");
          result.css("color", "blue");
        } else {
            templogin=false;
          result.text(email + " is not valid");
          result.css("color", "red");
        }
        if(password.length>=6 && password.length<=16){
            resultpass.text("valid password");
            resultpass.css("color", "blue");
        }
        else{
            templogin=false;
            resultpass.text("invalid password");
            resultpass.css("color", "red"); 
        }
        if(templogin){
            $.post('http://localhost:3000/register',{email:email,password:password}).done(function(data){
                if(data===false){
                    resultlogin.text('account already exist!')
                }
                else{
                    resultlogin.text('Done! moving to main page!')
                  window.location.replace("http://localhost:3000/loggedin");
                }
            });
        }
        else{
            resultlogin.text('Error in details!');
        }
        return false;
      }
      $("#validate").on('click',validate);
});