var url;
if (window.location.hostname=='localhost'){
  url = 'http://localhost:90'
} else {
  url = 'https://mbbdev.site/wp-content/plugins/plugin_maxwell/includes/teste1/server'
}

teste = [];

$('#calendario_home').ready(function () {
  var data_atual = new Date();
  const days2020 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const days2021 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  calendario(days2020,days2021,data_atual);
  consultaEventos(days2020,days2021,data_atual);

  alertaFuncionarios();
  console.log(teste)
})

function mudaCor(teste){
  $('.'+teste).css("color","red");
}

function voltaCor(teste){
  $('.'+teste).css("color","#ffffff");
}

function alertaFuncionarios(){
  for (var i = 0; i <= 31 ; i++) {

    $(".td1"+i).click(function (){
      alert("Funcionarios");
    });
    $(".td2"+i).click(function (){
      alert("Funcionarios");
    });
    $(".td3"+i).click(function (){
      alert("Funcionarios");
    });
   }
}

function consultaEventos(days2020,days2021,data_atual){
  $.ajax({
    type: "GET",
    url: url+"/home.php?listarEventos",
    datatype: 'json',
    success: function(resultado){
      console.log(resultado);
      for (var i=0;i<resultado['abonos'].length;i++){
        teste.push(resultado['abonos'][i]['nome']);
        // calendario_referente_inicial = ''
        calendario_referente_final = ''
        var data_inicial_banco = new Date(resultado['abonos'][i]['data_inicial']);
        var data_final_banco = new Date(resultado['abonos'][i]['data_final']);
        data_inicial_banco.setDate(data_inicial_banco.getDate() + 1);
        data_final_banco.setDate(data_final_banco.getDate() + 1);
        var mes_inicial=data_inicial_banco.getMonth();
        var mes_final=data_final_banco.getMonth();

        if (data_inicial_banco.getMonth()==data_atual.getMonth()){
          calendario_referente_inicial = '#calendario1'
        } else if (data_inicial_banco.getMonth()==data_atual.getMonth()+1){
          calendario_referente_inicial = '#calendario2'
        } else if (data_inicial_banco.getMonth()==data_atual.getMonth()+2){
          calendario_referente_inicial = '#calendario3'
        }

        if (data_final_banco.getMonth()==data_atual.getMonth()){
          calendario_referente_final = '#calendario1'
        } else if (data_final_banco.getMonth()==data_atual.getMonth()+1){
          calendario_referente_final = '#calendario2'
        } else if (data_final_banco.getMonth()==data_atual.getMonth()+2){
          calendario_referente_final = '#calendario3'
        }

        if (mes_inicial==mes_final){
          if (typeof calendario_referente_inicial!=='undefined'){
            for (dia=data_inicial_banco.getDate();dia<=data_final_banco.getDate();dia++){
              if (resultado['abonos'][i]['status']=='Pendente'){
                var valor = $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').text();
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').css('visibility','visible');
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').text(parseInt(valor)+1)
              } else {
                var valor = $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-primary').text();
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-primary').css('visibility','visible');
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-primary').text(parseInt(valor)+1)
              }
            }
          }
        } else {
          for (dia=data_inicial_banco.getDate();dia<=days2020[data_inicial_banco.getMonth()];dia++){
            if (typeof calendario_referente_inicial!=='undefined'){
              if (resultado['abonos'][i]['status']=='Pendente'){
                var valor = $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').text();
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').css('visibility','visible');
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').text(parseInt(valor)+1)
              } else {
                var valor = $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-primary').text();
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-primary').css('visibility','visible');
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-primary').text(parseInt(valor)+1)
              }
            }
            if (dia==days2020[data_inicial_banco.getMonth()]&&calendario_referente_final!=''){
              for (dia1=1;dia1<=data_final_banco.getDate();dia1++){
                if (resultado['abonos'][i]['status']=='Pendente'){
                  var valor = $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-danger').text();
                  $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-danger').css('visibility','visible');
                  $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-danger').text(parseInt(valor)+1)
                } else {
                  var valor = $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-primary').text();
                  $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-primary').css('visibility','visible');
                  $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-primary').text(parseInt(valor)+1)
                }
              }
            }
          }
        }

      }

      for (var i=0;i<resultado['ferias'].length;i++){
        calendario_referente_inicial = ''
        calendario_referente_final = ''
        var data_inicial_banco = new Date(resultado['ferias'][i]['data_inicial']);
        var data_final_banco = new Date(resultado['ferias'][i]['data_final']);
        data_inicial_banco.setDate(data_inicial_banco.getDate() + 1);
        data_final_banco.setDate(data_final_banco.getDate() + 1);
        var mes_inicial=data_inicial_banco.getMonth();
        var mes_final=data_final_banco.getMonth();


        if (data_inicial_banco.getMonth()==data_atual.getMonth()){
          calendario_referente_inicial = '#calendario1'
        } else if (data_inicial_banco.getMonth()==data_atual.getMonth()+1){
          calendario_referente_inicial = '#calendario2'
        } else if (data_inicial_banco.getMonth()==data_atual.getMonth()+2){
          calendario_referente_inicial = '#calendario3'
        }

        if (data_final_banco.getMonth()==data_atual.getMonth()){
          calendario_referente_final = '#calendario1'
        } else if (data_final_banco.getMonth()==data_atual.getMonth()+1){
          calendario_referente_final = '#calendario2'
        } else if (data_final_banco.getMonth()==data_atual.getMonth()+2){
          calendario_referente_final = '#calendario3'
        }

        if (mes_inicial==mes_final){
          if (typeof calendario_referente_inicial!=='undefined'){
            for (dia=data_inicial_banco.getDate();dia<=data_final_banco.getDate();dia++){
              if (resultado['ferias'][i]['status']=='Pendente'){
                var valor = $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').text();
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').css('visibility','visible');
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').text(parseInt(valor)+1)
              } else {
                var valor = $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-light').text();
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-light').css('visibility','visible');
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-light').text(parseInt(valor)+1)
              }
            }
          }
        } else {
          for (dia=data_inicial_banco.getDate();dia<=days2020[data_inicial_banco.getMonth()];dia++){
            if (typeof calendario_referente_inicial!=='undefined'){
              if (resultado['ferias'][i]['status']=='Pendente'){
                var valor = $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').text();
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').css('visibility','visible');
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-danger').text(parseInt(valor)+1)
              } else {
                var valor = $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-light').text();
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-light').css('visibility','visible');
                $(calendario_referente_inicial+' td.td'+dia+' .notificacao.badge-light').text(parseInt(valor)+1)
              }
            }
            if (dia==days2020[data_inicial_banco.getMonth()]&&calendario_referente_final!=''){
              for (dia1=1;dia1<=data_final_banco.getDate();dia1++){
                if (resultado['ferias'][i]['status']=='Pendente'){
                  var valor = $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-danger').text();
                  $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-danger').css('visibility','visible');
                  $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-danger').text(parseInt(valor)+1)
                } else {
                  var valor = $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-light').text();
                  $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-light').css('visibility','visible');
                  $(calendario_referente_final+' td.td'+dia1+' .notificacao.badge-light').text(parseInt(valor)+1)
                }
              }
            }
          }
        }
      }
    },
  });
}

function calendario (days2020,days2021,data_atual){
  var n = data_atual.getMonth();

  var inicio_mes1 = new Date(data_atual.getFullYear(), n, 1);
  var inicio_mes2 = new Date(data_atual.getFullYear(), n+1, 1);
  var inicio_mes3 = new Date(data_atual.getFullYear(), n+2, 1);

  var meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  $('p#mes1').html(meses[n]);
  $('p#mes2').html(meses[n+1]);
  $('p#mes3').html(meses[n+2]);


  var num_colunas = 1;
  for (var x=1, y=inicio_mes1.getDay();x<=days2020[n];x++,y++){
    if(y%7==0&&y!=0){
      num_colunas++;
      $('#calendario1').append('<tr></tr>');
    }

    if (x==1){
      for (z=0;z<y;z++){
        $('#calendario1').append('<td></td>');
      }
    }

    $('#calendario1').append('<td class="td'+x+' td11'+x+'" onMouseOver=mudaCor("td11'+x+'") onMouseout=voltaCor("td11'+x+'")><span>'+x+'</span></td>');
  }
  if (num_colunas==5){
    $('#calendario1').append('<tr></tr>');
    $('#calendario1').append('<td class="tdSobressalente"><span class="notificacao">1</span></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td>');
  }
  $('#calendario1 td').prepend('<span class="notificacao badge badge-danger">0</span>');
  $('#calendario1 td').prepend('<span class="notificacao badge badge-light">0</span>');
  $('#calendario1 td').prepend('<span class="notificacao badge badge-primary">0</span>');


  var num_colunas = 1;
  for (var x=1, y=inicio_mes2.getDay();x<=days2020[n+1];x++,y++){
    if(y%7==0&&y!=0){
      num_colunas++;
      $('#calendario2').append('<tr></tr>');
    } else if (x==1){
      for (z=0;z<y;z++){
        $('#calendario2').append('<td></td>');
      }
    }
    $('#calendario2').append('<td class="td'+x+' td22'+x+'" onMouseOver=mudaCor("td22'+x+'") onMouseout=voltaCor("td22'+x+'")><span>'+x+'</span></td>');
  }
  if (num_colunas==5){
    $('#calendario2').append('<tr></tr>');
    $('#calendario2').append('<td class="tdSobressalente"><span class="notificacao">1</span></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td>');
  }
  $('#calendario2 td').prepend('<span class="notificacao badge badge-danger">0</span>');
  $('#calendario2 td').prepend('<span class="notificacao badge badge-light">0</span>');
  $('#calendario2 td').prepend('<span class="notificacao badge badge-primary">0</span>');
var num_colunas = 1;
  for (var x=1, y=inicio_mes3.getDay();x<=days2020[n+2];x++,y++){
    if(y%7==0&&y!=0){
      num_colunas++;
      $('#calendario3').append('<tr></tr>');
    } else if (x==1){
      for (z=0;z<y;z++){
        $('#calendario3').append('<td></td>');
      }
    }
    $('#calendario3').append('<td class="td'+x+' td33'+x+'" onMouseOver=mudaCor("td33'+x+'") onMouseout=voltaCor("td33'+x+'")><span>'+x+'</span></td>');
  }
  if (num_colunas==5){
    $('#calendario3').append('<tr></tr>');
    $('#calendario3').append('<td class="tdSobressalente"><span class="notificacao">1</span></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td><td class="tdSobressalente"></td>');
  }
  $('#calendario3 td').prepend('<span class="notificacao badge badge-danger">0</span>');
  $('#calendario3 td').prepend('<span class="notificacao badge badge-light">0</span>');
  $('#calendario3 td').prepend('<span class="notificacao badge badge-primary">0</span>');
}
