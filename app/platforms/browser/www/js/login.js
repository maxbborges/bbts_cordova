$("#entrar").click(function(){
  // var dados = $('#form_novo_funcionario').serialize();

  $.ajax({
    type: "POST",
    url: "http://"+window.location.hostname+":90/login.php",
    data: {'login': $("#input_login").val(), 'password': $("#input_password").val()},
    datatype: 'json',
    success: function(resultado){
      console.log(resultado);
        if (resultado == 0){
            alert("Usuario incorreto");
                  }
        else {
          window.location = "home.html";
          
        }


    },
  }).fail(function(jqXHR, textStatus){
    console.log(jqXHR);
  });
});
