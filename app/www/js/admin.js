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

$( document ).ready(function() {
  $(".submenu-adm button").click(function(){
    $(".sub_collapse_inserir").removeClass('show').addClass("");
    $(".sub_collapse_listar").removeClass('show').addClass("");
  });

  $("#botao_inserir").click(function(){
    $(".sub_collapse_listar").removeClass('show').addClass("");
  });

  $("#botao_listar").click(function(){
    $(".sub_collapse_inserir").removeClass('show').addClass("");
  });

  $(".submenu-adm button.btn_ferias").click(function(){
    $("#collapse_funcionarios").removeClass('show');
    $("#collapse_abonos").removeClass('show');
    $("#collapse_outros").removeClass('show');
  });

  $(".submenu-adm button.btn_abonos").click(function(){
    $("#collapse_funcionarios").removeClass('show');
    $("#collapse_ferias").removeClass('show');
    $("#collapse_outros").removeClass('show');
  });

  $(".submenu-adm button.btn_outros").click(function(){
    $("#collapse_funcionarios").removeClass('show');
    $("#collapse_abonos").removeClass('show');
    $("#collapse_ferias").removeClass('show');
  });

  $(".submenu-adm button.btn_funcionarios").click(function(){
    $("#collapse_ferias").removeClass('show');
    $("#collapse_abonos").removeClass('show');
    $("#collapse_outros").removeClass('show');
  });
});
