$.getJSON("../js/teste.json", function (json) {
  url = json.parametros.url

  $( ".login_btn" ).on( "click", function() {
    console.log('a')
    setTimeout(function(){ 
      retorno = func_login(url); 
    }, 500);
  });
});

function func_login(url){
  if (($("#input_login").val())!=''&&($("#input_password").val())!=''){
    setTimeout(function(){ 
      $.ajax({
        type: "POST",
        url: url+"/login.php",
        data: {'login': $("#input_login").val(), 'password': $("#input_password").val()},
        datatype: 'json',
        success: function(resultado){
            if (resultado == 0 || resultado == null || resultado['usuario_bbts']== null){
              $('.loader').css("visibility", "hidden")
              $('.login_btn').prop("disabled",false);  
              alert("Usuario incorreto");
            } else {
              window.localStorage.setItem('login', true);
              window.localStorage.setItem('usuario_bbts', resultado['usuario_bbts']);
              window.localStorage.setItem('atributos', resultado['atributos']);
              window.localStorage.setItem('matricula', resultado['matricula']);
              window.location = "home.html";
            }
        },
        beforeSend: function(){
          $('.loader').css("visibility", "visible")
          $('.login_btn').prop("disabled",true);
        },
      }).fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      });
    }, 500);
  } else {
    alert("Preencha todos os campos");
  }
}
