$.getJSON("../js/teste.json", function (json) {
  url = json.parametros.url
  var retorno =0;
  setTimeout(function(){ 
    retorno = consultaEventos(url); 
  }, 500);
  
  $( ".click" ).on( "click", function() {
    resultado = ($.parseJSON(retorno.responseText)).faltas;
    nomePessoas = ''
    idCalendario = (($(this).parents()[6].id).match(/\d+/))[0]
    clickData = new Date()
    clickData.setFullYear(clickData.getFullYear(),clickData.getMonth()+parseInt(idCalendario),parseInt($(this)[0].defaultValue))
    clickData.setHours(23);
    clickData.setMinutes(59);
    clickData.setSeconds(58);
    
    for (r in resultado){
      inicio = new Date(resultado[r].data_inicio)
      fim = new Date(resultado[r].data_fim)
      
      if (clickData>=inicio&&clickData<=fim){
        nomePessoas+=resultado[r].nome
      }
    }
    if (nomePessoas!=''){
      alert(nomePessoas)
    } else {
      alert('Nenhuma Ferias Encontrada!')
    }
  });
});

const anos = {
  2020: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  2021: [30, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}
const tipos = {
  'pendente': 0,
  'ferias': 1, 
  'abonos': 2, 
}

campoAbonos = 0;
campoFerias = 0;
campoPendentes = 0;

function preencheEventos(resultado,inicio_mes,dia){
  console.log(resultado)
  console.log(inicio_mes)
  console.log(dia)
  // for (k=0;k<resultado.length;k++){
  //   data_inicio = new Date(resultado[k].data_inicio)
  //   // console.log(data_inicio)
  //   if (data_inicio.getDate()>dia && data_inicio.getMonth()>=inicio_mes.getMonth()){
  //     break;
  //   }
  //   // console.log(data_inicio.getFullYear())
  //   if (data_inicio != 'Invalid Date'){
  //     if(data_inicio.getDate()==dia && data_inicio.getMonth()<=inicio_mes.getMonth() && data_inicio.getFullYear()=='2021'){
  //       if (resultado[k].status=='pendente'){
  //         campoPendentes=campoPendentes+1;
  //       } else {
  //         if (resultado[k].tipo=='abono'){
  //           campoAbonos = campoAbonos+1
  //         } else {
  //           campoFerias = campoFerias+1
  //         }
  //       }
  //       resultado[k]={'data_fim': new Date(resultado[k].data_fim),'status': resultado[k].status,'tipo': resultado[k].tipo}
  //     }
  //   }
  // }

  // $(calendarioElementos[elemento].children[0].children[0].children[tipos.abonos].children[0]).text(campoAbonos.toString());
  // $(calendarioElementos[elemento].children[0].children[0].children[tipos.ferias].children[0]).text(campoFerias.toString());
  // $(calendarioElementos[elemento].children[0].children[0].children[tipos.pendentes].children[0]).text(campoPendentes.toString());  

  // for (k=0;k<resultado.length;k++){
  //   if (typeof(resultado[k].data_fim)=='object'){
  //     if ((resultado[k].data_fim).getDate()==dia && (resultado[k].data_fim).getMonth()==inicio_mes.getMonth()) {
  //       if (resultado[k].status=='pendente'){
  //         campoPendentes=campoPendentes-1;
  //       } else {
  //         if (resultado[k].tipo=='abono'){
  //           campoAbonos= campoAbonos-1
  //         } else {
  //           campoFerias= campoFerias-1
  //         }
  //       }
  //       resultado.splice(k, 1);
  //     }
      
  //   }
  // }
}

function preencheDiasCalendario(calendarioLinhas, inicio_mes,resultado) {
  dia=1;
  qtdDiasMes = anos[inicio_mes.getFullYear()][inicio_mes.getMonth()] +1;
  for (linha = 1; linha < calendarioLinhas.length; linha++) {
    calendarioElementos = calendarioLinhas[linha].cells

    for (elemento = 0; elemento < calendarioElementos.length; elemento++) {
      if (dia < qtdDiasMes) {
        if (linha == 1) {
          if (inicio_mes.getDay() <= elemento) {
            $(calendarioElementos[elemento].children[0].children[1].children[0].children[0]).val(dia.toString());
            dia = dia + 1;
          }
        } else {
          $(calendarioElementos[elemento].children[0].children[1].children[0].children[0]).val(dia.toString())
          dia = dia + 1;
        }
      }

      if ($(calendarioElementos[elemento].children[0].children[1].children[0].children[0]).val()==0){
        $(calendarioElementos[elemento].children[0].children[1].children[0].children[0]).css("visibility", "hidden");
      }
    }
  }
  
}

function teste2(inicioFalta,fimFalta,calendario,feriasMes){
  tipo=''
  if (feriasMes.status=='pendente'){
    tipo = feriasMes.status
  } else {
    tipo = feriasMes.tipo
  }

  for (a=inicioFalta.getDate();a<fimFalta;a++){
    elementoCalendario = $("#calendario"+calendario+" input[value="+a+"]").parents();
    alertas = elementoCalendario[2].children[0].children[tipos[tipo]].children[0]
    $(alertas).text(parseInt($(alertas).text())+1);
    $(alertas).css("visibility", "visible");
  }
}

function teste(inicio_mes,feriasMes,calendario,resto){
  qtdDiasMes = anos[inicio_mes.getFullYear()][inicio_mes.getMonth()] +1;
  if (resto != []){
    for (r in resto){
      inicioFalta = new Date(inicio_mes);
      fimFalta = new Date(resto[r].data_fim);
      teste2(inicioFalta,fimFalta.getDate()+1,calendario,resto[r])
      resto.shift();
    }
  }

  for (r in feriasMes){
    inicioFalta = new Date(feriasMes[r].data_inicio);
    fimFalta = new Date(feriasMes[r].data_fim);
    
    if (inicioFalta.getMonth()==fimFalta.getMonth()){
      teste2(inicioFalta,fimFalta.getDate()+1,calendario,feriasMes[r])
    } else {
      teste2(inicioFalta,qtdDiasMes,calendario,feriasMes[r])
      resto.push(feriasMes[r])
    }
  }
  return resto
}

function consultaEventos(url) {
  return $.ajax({
    type: "GET",
    url: url + "/home.php?listarEventos",
    datatype: 'json',
    success: function (resultado) {
      resto=[]
      for (i = 0; i < 3; i++) {
        calendarioLinhas = (document.querySelectorAll("#calendario" + i.toString()))[0].rows
        var data_atual = new Date();
        var inicio_mes = new Date(data_atual.getFullYear(), data_atual.getMonth() + i, 1);
        console.log(inicio_mes)
        resultadoFaltas = resultado.faltas
        feriasMes=[]
        for (r in resultadoFaltas){
          mesInicioFalta = (new Date(resultadoFaltas[r].data_inicio)).getMonth()
          mesFimFalta = (new Date(resultadoFaltas[r].data_fim)).getMonth()

          if(mesInicioFalta==data_atual.getMonth()+i){
            feriasMes.push(resultadoFaltas[r])
          }
        }
        preencheDiasCalendario(calendarioLinhas, inicio_mes,feriasMes);
        resto = teste(inicio_mes,feriasMes,i,resto)
      }
    }
  });
}
