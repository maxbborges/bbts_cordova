var url;
if (window.location.hostname=='localhost'){
  url = 'http://localhost:90'
} else {
  url = 'https://mbbdev.site/wp-content/plugins/plugin_maxwell/includes/teste1/server'
}

function listarFuncionarios(){
  $('#linhas').html('');
  $.ajax({
    type: "GET",
    url: url+"/admin.php?logar",
    datatype: 'json',
    success: function(resultado){
      for (var i=0;i<resultado.length;i++){
        $('#linhas').append(
          '<tr><td>'+resultado[i]['matricula']+
          '</td><td>'+resultado[i]['nome']+
          '</td><td>'+resultado[i]['chave_c']+
          '</td><td>'+resultado[i]['email']+
          '</td><td>'+resultado[i]['telefone']+
          // '</td><td>'+resultado[i]['status']+
          '</td></tr>');
      }

    },
  });
}

function inserirFuncionarios(){
  $.ajax({
    type: "POST",
    url: url+"/admin.php",
    data: {'acao':'inserirFuncionario','nome': $("#input_name").val(), 'chavec': $("#input_chavec").val(),'matricula': $("#input_matricula").val(),'email': $("#input_email").val()},
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

function solicitacaoFolgas(id,tipo,status){
  $.ajax({
      type: "POST",
      url: url+"/admin.php",
      data: {'acao':'aceitarFolgas', 'id': id,'tipo':tipo,'status':status},
      datatype: 'json',
      success: function(resultado){
        alert('Status Modificado para '+status+'!');
        location.reload();
    },
  }).fail(function(jqXHR, textStatus){
    console.log(jqXHR);
  });
}

function listarAbonos(){
  $('#linhas_abonos').html('');
  $.ajax({
    type: "GET",
    url: url+"/admin.php?listarAbonos",
    datatype: 'json',
    success: function(resultado){
      for (var i=0;i<resultado.length;i++){
        $('#linhas_abonos').append(
          '<tr><td>'+resultado[i]['nome']+
          '</td><td>'+resultado[i]['data_inicial']+
          '</td><td>'+resultado[i]['data_final']+
          '</td><td>'+resultado[i]['data_solicitacao']+
          '</td><td>'+resultado[i]['status']+
          '</td><td><button class="btn-success" onclick=solicitacaoFolgas('+resultado[i]['id']+',"abonos","Aprovado")>AP</button><button class="btn-danger" onclick=solicitacaoFolgas('+resultado[i]['id']+',"abonos","Rejeitado")>RP</button>'+
          '</td></tr>');
      }
    },
  });
}

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
      }
    },
  });
}

function inserirAbono(){
  console.log(window.localStorage.getItem('matricula'));
  if ($("#input_data_abono").val()!='' && $('#input_abono_dias').val()!='' && $('#input_final_abono').val()!=''){
    $.ajax({
      type: "POST",
      url: url+"/admin.php",
      data: {'acao':'inserirAbono','matricula': window.localStorage.getItem('matricula'),'dataInicial': $("#input_data_abono").val(),'dataFinal': $('#input_final_abono').val()},
      datatype: 'json',
      success: function(resultado){
        if (resultado==1){
          alert ("Inserido com sucesso");
        } else {
          // alert('Erro ao inserir');
          // alert(resultado);
          console.log(resultado);
        }
      },
    }).fail(function(jqXHR, textStatus){
      console.log(jqXHR);
      console.log(textStatus);
    });
  } else {
    alert('Preencha Todos os campos!');
  }
}

function listarFerias(){
  $('#linhas_ferias').html('');
  $.ajax({
    type: "GET",
    url: url+"/admin.php?listarFerias",
    datatype: 'json',
    success: function(resultado){
      for (var i=0;i<resultado.length;i++){
        $('#linhas_ferias').append(
          '<tr><td>'+resultado[i]['nome']+
          '</td><td>'+resultado[i]['data_inicial']+
          '</td><td>'+resultado[i]['data_final']+
          '</td><td>'+resultado[i]['data_solicitacao']+
          '</td><td>'+resultado[i]['num_abono']+
          '</td><td>'+resultado[i]['adiantamento']+
          '</td><td>'+resultado[i]['status']+
          // '</td><td><button >X</button><button>V</button>'+
          // '</td></tr>');
          '</td><td><button class="btn-success" onclick=solicitacaoFolgas('+resultado[i]['id']+',"ferias","Aprovado")>AP</button><button class="btn-danger" onclick=solicitacaoFolgas('+resultado[i]['id']+',"ferias","Rejeitado")>RP</button>'+
          '</td></tr>');
      }
    },
  });
}

function inserirFerias(){
  if ($("#input_ferias_data_inicial").val()!='' && $('#input_ferias_final').val()!='' && $('#input_ferias_quantidade_dias').val()!=''){
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
    url: url+"/admin.php",
    data: {'acao':'inserirFerias', 'matricula':window.localStorage.getItem('matricula') ,'dataInicial': $("#input_ferias_data_inicial").val(),'dataFinal': $('#input_ferias_final').val(),'numAbono': numAbono,'adiantamento':$('input[name=ferias_adiantamento]:checked').val()},
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
  $('#input_data_abono').val(y+'-'+m+'-'+d);

  $('#matriculalogin').val(localStorage.getItem('matricula'));

  var atributos = (localStorage.getItem('atributos')).split(',');

  if (atributos.length==2){
  } else if (atributos.length==3){
  } else {
    var thingToRemove = document.querySelectorAll(".row .submenu-adm")[0].children[3];
    thingToRemove.parentNode.removeChild(thingToRemove);

    var thingToRemove = document.querySelectorAll("#collapse_abonos .row")[0].children[1];
    thingToRemove.parentNode.removeChild(thingToRemove);

    var thingToRemove = document.querySelectorAll("#collapse_ferias .row")[0].children[1];
    thingToRemove.parentNode.removeChild(thingToRemove);
  }

  $( "#input_ferias_quantidade_dias" ).keyup(function() {
    var date = new Date($('#input_ferias_data_inicial').val());
    date.setDate(date.getDate()+1+parseInt($("#input_ferias_quantidade_dias").val()));
    var d = ("0" + date.getDate()).slice(-2);
    var m =  ("0" + (date.getMonth() + 1)).slice(-2);
    var y = date.getFullYear();
    $('#input_ferias_final').attr("placeholder",d+'-'+m+'-'+y);
    $('#input_ferias_final').val(d+'-'+m+'-'+y);
  });

  $( "#input_abono_dias" ).keyup(function() {
    var date = new Date($('#input_data_abono').val());
    date.setDate(date.getDate()+1+parseInt($("#input_abono_dias").val()));
    var d = ("0" + date.getDate()).slice(-2);
    var m =  ("0" + (date.getMonth() + 1)).slice(-2);
    var y = date.getFullYear();
    $('#input_final_abono').attr("placeholder",d+'-'+m+'-'+y);
    $('#input_final_abono').val(d+'-'+m+'-'+y);
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
