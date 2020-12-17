
url = null
$.getJSON("../js/teste.json", function (json) {
  url = json.parametros.url
});




function inserirFerias() {
  if ($("#input_ferias_data_inicial").val() != '' && $('#input_ferias_final').val() != '' && $('#input_ferias_quantidade_dias').val() != '') {
    // var dataSelecionada= new Date($('#input_ferias_data_inicial').val());
    // dataSelecionada.setDate(dataSelecionada.getDate()+1);
    // var data1 = new Date();
    // var data2 = new Date(dataSelecionada);

    if ($('input[name=ferias_abono]:checked').val() == '1') {
      if ($('#ferias_qtd_dias_abono').val() == '') {
        alert('Preencha a quantidade de dias de abono!');
      } else {
        var numAbono = $('#ferias_qtd_dias_abono').val();
        inserirFeriasAjax(numAbono);
      }
    } else {
      var numAbono = 0;
      inserirFeriasAjax(numAbono);
    }
  } else {
    alert('Preencha Todos os campos!');
  }
}

function inserirFeriasAjax(numAbono) {
  $.ajax({
    type: "POST",
    url: url + "/admin.php",
    data: { 'acao': 'inserirFerias', 'matricula': window.localStorage.getItem('matricula'), 'dataInicial': $("#input_ferias_data_inicial").val(), 'dataFinal': $('#input_ferias_final').val(), 'numAbono': numAbono, 'adiantamento': $('input[name=ferias_adiantamento]:checked').val() },
    datatype: 'json',
    success: function (resultado) {
      if (resultado == 1) {
        alert("Inserido com sucesso");
        window.location = 'home.html';
      } else {
        alert('Erro ao inserir');
        alert(resultado);
      }
    },
  }).fail(function (jqXHR, textStatus) {
    console.log(jqXHR);
  });
}

$("#input_ferias_quantidade_dias").keyup(function () {
  var date = new Date($('#input_ferias_data_inicial').val());
  date.setDate(date.getDate() + 1 + parseInt($("#input_ferias_quantidade_dias").val()));
  var d = ("0" + date.getDate()).slice(-2);
  var m = ("0" + (date.getMonth() + 1)).slice(-2);
  var y = date.getFullYear();
  $('#input_ferias_final').attr("placeholder", d + '-' + m + '-' + y);
  $('#input_ferias_final').val(d + '-' + m + '-' + y);
});

$("#btn_listar").click(function () {
  window.open('ferias_listar.html', 'newwindow', 'width=300,height=250');
  return false;
});