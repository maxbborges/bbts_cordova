function listarFuncionarios(){
  $('#linhas').html('');
  $.ajax({
    type: "GET",
    url: "http://"+window.location.hostname+":90/admin.php?logar",
    datatype: 'json',
    success: function(resultado){
      for (var i=0;i<resultado.length;i++){
        $('#linhas').append('<tr><td>'+resultado[i]['id']+'</td><td>'+resultado[i]['nome']+'</td><td>'+resultado[i]['chave_c']+'</td><td>'+resultado[i]['matricula']+'<td>'+resultado[i]['email']+'</td><td>'+resultado[i]['telefone']+'</td></tr>');
      }

    },
  });
}

function inserirFuncionarios(){
  $.ajax({
    type: "POST",
    url: "http://"+window.location.hostname+":90/admin.php",
    data: {'acao':'inserirFuncionario','nome': $("#input_name").val(), 'chavec': $("#input_chavec").val(),'matricula': $("#input_matricula").val(),'email': $("#input_email").val(),'telefone': $("#input_telefone").val()},
    datatype: 'json',
    success: function(resultado){
      if (resultado==1){
        alert ("Inserido com sucesso");
      } else {
        alert('Erro ao inserir');
      }
    },
  }).fail(function(jqXHR, textStatus){
    console.log(jqXHR);
  });
}

function inserirAbono(){
  console.log('inserir')
}

function listarAbonos(){
  console.log('listar')
}

function listarFerias(){
  $('#linhas_ferias').html('');
  $.ajax({
    type: "GET",
    url: "http://"+window.location.hostname+":90/admin.php?listarFerias",
    datatype: 'json',
    success: function(resultado){
      for (var i=0;i<resultado.length;i++){
        $('#linhas_ferias').append('<tr><td>XXX</td><td>'+resultado[i]['data_inicial']+'</td><td>'+resultado[i]['data_final']+'</td><td>'+resultado[i]['data_solicitacao']+'</td><td>'+resultado[i]['num_abono']+'<td>'+resultado[i]['adiantamento']+'</td></tr>');
      }

    },
  });
}

function inserirFerias(){
  var x = $('input[name=ferias_abono]:checked');
  var y = $('input[name=ferias_adiantamento]:checked').val();

  if ($("#input_ferias_data_inicial").val()!='' && $('#input_ferias_final').val()!='' && $('#input_ferias_quantidade_dias').val()){
    // var dataSelecionada= new Date($('#input_ferias_data_inicial').val());
    // dataSelecionada.setDate(dataSelecionada.getDate()+1);
    // var data1 = new Date();
    // var data2 = new Date(dataSelecionada);

    if ($('input[name=ferias_abono]:checked').val()=='1'){
      if ($('#ferias_qtd_dias_abono').val()==''){
        alert ('Preencha a quantidade de dias de abono!');
      } else {
        var numAbono = $('#ferias_qtd_dias_abono').val();
        inserirFeriasAjax(numAbono);
      }
    } else{
      var numAbono = 0;
      inserirFeriasAjax(numAbono);
    }
  } else {
    alert('Preencha Todos os campos!');
  }
}

function inserirFeriasAjax(numAbono){
  $.ajax({
    type: "POST",
    url: "http://"+window.location.hostname+":90/admin.php",
    data: {'acao':'inserirFerias','dataInicial': $("#input_ferias_data_inicial").val(),'dataFinal': $('#input_ferias_final').val(),'numAbono': numAbono,'adiantamento':$('input[name=ferias_adiantamento]:checked').val()},
    datatype: 'json',
    success: function(resultado){
      if (resultado==1){
        alert ("Inserido com sucesso");
      } else {
        alert('Erro ao inserir');
        alert(resultado);
      }
    },
  }).fail(function(jqXHR, textStatus){
    console.log(jqXHR);
  });
}

$( document ).ready(function() {
  var data_inicial = new Date();
  var d = ("0" + data_inicial.getDate()).slice(-2);
  var m =  ("0" + (data_inicial.getMonth() + 1)).slice(-2);
  var y = data_inicial.getFullYear();
  $('#input_ferias_data_inicial').val(y+'-'+m+'-'+d);

  $( "#input_ferias_quantidade_dias" ).keyup(function() {
    var date = new Date($('#input_ferias_data_inicial').val());
    date.setDate(date.getDate()+1+parseInt($("#input_ferias_quantidade_dias").val()));
    var d = ("0" + date.getDate()).slice(-2);
    var m =  ("0" + (date.getMonth() + 1)).slice(-2);
    var y = date.getFullYear();
    $('#input_ferias_final').attr("placeholder",d+'/'+m+'/'+y);
    $('#input_ferias_final').val(d+'/'+m+'/'+y);
  });

  $(".submenu-adm button").click(function(){
    $(".sub_collapse_inserir").removeClass('show').addClass("");
    $(".sub_collapse_listar").removeClass('show').addClass("");
  });

  $("#ferias_sem_abono").click(function(){
    $("div.form-group.input_qtd_abono").css("display", "none");
  });

  $("#ferias_com_abono").click(function(){
    $("div.form-group.input_qtd_abono").css("display", "block");
  });

  $(".btn_inserir").click(function(){
    $(".sub_collapse_listar").removeClass('show').addClass("");
  });

  $(".btn_listar").click(function(){
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
