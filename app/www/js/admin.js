console.log(window.location.hostname);
$("#botao_listar").click(function(){
  $('#linhas').html('');
  $.ajax({
    type: "POST",
    url: "http://"+window.location.hostname+":90",
    datatype: 'json',
    success: function(resultado){
      for (var i=0;i<resultado.length;i++){
        $('#linhas').append('<tr><td>'+resultado[i]['id']+'</td><td>'+resultado[i]['nome']+'</td><td>'+resultado[i]['chave_c']+'</td><td>'+resultado[i]['matricula']+'</td></tr>');
      }

    },
  });
});
