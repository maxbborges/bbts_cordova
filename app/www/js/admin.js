console.log(window.location.hostname);
$("#botao_listar").click(function(){
  $('#linhas').html('');
  $.ajax({
    type: "GET",
    url: "http://"+window.location.hostname+":90",
    datatype: 'json',
    success: function(resultado){
      for (var i=0;i<resultado.length;i++){
        $('#linhas').append('<tr><td>'+resultado[i]['id']+'</td><td>'+resultado[i]['nome']+'</td><td>'+resultado[i]['chave_c']+'</td><td>'+resultado[i]['matricula']+'<td>'+resultado[i]['email']+'</td><td>'+resultado[i]['telefone']+'</td></tr>');
      }

    },
  });
});

$("#novo_funcionario").click(function(){
  // var dados = $('#form_novo_funcionario').serialize();

  $.ajax({
    type: "POST",
    url: "http://"+window.location.hostname+":90/admin.php",
    data: {'nome': $("#input_name").val(), 'chavec': $("#input_chavec").val(),'matricula': $("#input_matricula").val(),'email': $("#input_email").val(),'telefone': $("#input_telefone").val()},
    datatype: 'json',
    success: function(resultado){
    console.log(resultado);

    },
  });

});
