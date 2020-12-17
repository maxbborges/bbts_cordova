url = null
$.getJSON( "../js/teste.json", function( json ) {
  url = json.parametros.url
});

function func_login(){
  if (($("#input_login").val())!=''&&($("#input_password").val())!=''){
    $.ajax({
      type: "POST",
      url: url+"/login.php",
      data: {'login': $("#input_login").val(), 'password': $("#input_password").val()},
      datatype: 'json',
      success: function(resultado){
        console.log(resultado)
          if (resultado == 0 || resultado == null || resultado['usuario_bbts']== null){
              alert("Usuario incorreto");
          } else {
            window.localStorage.setItem('login', true);
            window.localStorage.setItem('usuario_bbts', resultado['usuario_bbts']);
            window.localStorage.setItem('atributos', resultado['atributos']);
            window.localStorage.setItem('matricula', resultado['matricula']);
            window.location = "home.html";
          }
      },
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    });
  } else {
    alert("Preencha todos os campos");
  }
}
