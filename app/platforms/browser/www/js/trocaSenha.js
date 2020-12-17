url = null
$.getJSON( "../js/teste.json", function( json ) {
  url = json.parametros.url
});

$('#matriculalogin').val(localStorage.getItem('matricula'));

function trocaSenha(){
    $.ajax({
      type: "POST",
      url: url+"/admin.php",
      data:{'acao':'trocaSenha', 'matriculalogin': $("#matriculalogin").val(), 'senhaatual':$("#senhaatual").val(), 'novasenha':$("#novasenha").val()},
      datatype: 'json',
      success: function(resultado){
        if (resultado == 0 ){
          alert("Senha atual invalida!");
        }else{
          alert("Senha alterada com sucesso!");
          window.location='home.html';
        }
      },
    });
  }