function login(){
  if (($("#input_login").val())!=''&&($("#input_password").val())!=''){
    $.ajax({
      type: "POST",
      url: "http://"+window.location.hostname+":90/login.php",
      data: {'login': $("#input_login").val(), 'password': $("#input_password").val()},
      datatype: 'json',
      success: function(resultado){
          if (resultado == 0){
              alert("Usuario incorreto");
          } else {
            window.localStorage.setItem('login', true);
            window.location = "home.html";
          }
      },
    }).fail(function(jqXHR, textStatus){
      console.log(jqXHR);
    });
  } else {
    alert("Preencha todos os campos");
  }
}
