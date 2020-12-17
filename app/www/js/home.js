// var url = null
$.getJSON("../js/teste.json", function (json) {
  url = json.parametros.url
  var retorno =0;
  setTimeout(function(){ 
    retorno = consultaEventos(url); 
  }, 500);
  
  $( ".click" ).on( "click", function() {
    console.log($.parseJSON(retorno.responseText))
    console.log($(this).find('input.click').val())
  });
});

const anos = {
  2020: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  2021: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}
const tipos = {
  'pendentes': 0,
  'ferias': 1, 
  'abonos': 2, 
  
}

campoAbonos = 0;
campoFerias = 0;
campoPendentes = 0;

function limpaEventos(){
  if ($(calendarioElementos[elemento].children[0].children[0].children[tipos.abonos].children[0]).text()!='0'){
    $(calendarioElementos[elemento].children[0].children[0].children[tipos.abonos].children[0]).css("visibility", "visible");
  }

  if ($(calendarioElementos[elemento].children[0].children[0].children[tipos.ferias].children[0]).text()!='0'){
    $(calendarioElementos[elemento].children[0].children[0].children[tipos.ferias].children[0]).css("visibility", "visible");
  }

  if ($(calendarioElementos[elemento].children[0].children[0].children[tipos.pendentes].children[0]).text()!='0'){
    $(calendarioElementos[elemento].children[0].children[0].children[tipos.pendentes].children[0]).css("visibility", "visible");
  }
}

function preencheEventos(resultado,inicio_mes,dia){
  for (k=0;k<resultado.length;k++){
    data_inicio = new Date(resultado[k].data_inicio)
    console.log(data_inicio)
    if (data_inicio.getDate()>dia && data_inicio.getMonth()>=inicio_mes.getMonth()){
      break;
    }

    if (data_inicio != 'Invalid Date'){
      if(data_inicio.getDate()==dia && data_inicio.getMonth()<=inicio_mes.getMonth()){
        if (resultado[k].status=='pendente'){
          campoPendentes=campoPendentes+1;
        } else {
          if (resultado[k].tipo=='abono'){
            campoAbonos = campoAbonos+1
          } else {
            campoFerias = campoFerias+1
          }
        }
        resultado[k]={'data_fim': new Date(resultado[k].data_fim),'status': resultado[k].status,'tipo': resultado[k].tipo}
      }
    }
  }

  $(calendarioElementos[elemento].children[0].children[0].children[tipos.abonos].children[0]).text(campoAbonos.toString());
  $(calendarioElementos[elemento].children[0].children[0].children[tipos.ferias].children[0]).text(campoFerias.toString());
  $(calendarioElementos[elemento].children[0].children[0].children[tipos.pendentes].children[0]).text(campoPendentes.toString());  

  for (k=0;k<resultado.length;k++){
    if (typeof(resultado[k].data_fim)=='object'){
      if ((resultado[k].data_fim).getDate()==dia && (resultado[k].data_fim).getMonth()==inicio_mes.getMonth()) {
        if (resultado[k].status=='pendente'){
          campoPendentes=campoPendentes-1;
        } else {
          if (resultado[k].tipo=='abono'){
            campoAbonos= campoAbonos-1
          } else {
            campoFerias= campoFerias-1
          }
        }
        resultado.splice(k, 1);
      }
      
    }
  }
}

function preencheDiasCalendario(calendarioLinhas, dia, inicio_mes,resultado) {
  ano = anos[inicio_mes.getFullYear()][inicio_mes.getMonth()] +1;
  for (linha = 1; linha < calendarioLinhas.length; linha++) {
    calendarioElementos = calendarioLinhas[linha].cells
    for (elemento = 0; elemento < calendarioElementos.length; elemento++) {
      if (linha == 1) {
        if (inicio_mes.getDay() <= elemento) {
          $(calendarioElementos[elemento].children[0].children[1].children[0]).text(dia.toString());
          preencheEventos(resultado,inicio_mes,dia);
          dia = dia + 1;
        }
      } else {
        $(calendarioElementos[elemento].children[0].children[1].children[0]).text(dia.toString())
        preencheEventos(resultado,inicio_mes,dia);
        dia = dia + 1;
      }
      limpaEventos();
      
      if (dia == ano) {
        break;
      }
    }
  }
  
}

function consultaEventos(url) {
  return $.ajax({
    type: "GET",
    url: url + "/home.php?listarEventos",
    datatype: 'json',
    success: function (resultado) {
      for (i = 0; i < 3; i++) {
        calendarioLinhas = (document.querySelectorAll("#calendario" + i.toString()))[0].rows
        dia = 1
        var data_atual = new Date();
        var inicio_mes = new Date(data_atual.getFullYear(), data_atual.getMonth() + i, 1);
        preencheDiasCalendario(calendarioLinhas, dia, inicio_mes,resultado.faltas);
      }
    }
  });
}
