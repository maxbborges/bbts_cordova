$.getJSON("../js/teste.json", function (json) {
  url = json.parametros.url
});

function inserirAbono() {
  if ($("#input_data_abono").val() != '' && $('#input_abono_dias').val() != '' && $('#input_final_abono').val() != '') {
    $.ajax({
      type: "POST",
      url: url + "/admin.php",
      data: { 'acao': 'inserirAbono', 'matricula': window.localStorage.getItem('matricula'), 'dataInicial': $("#input_data_abono").val(), 'dataFinal': $('#input_final_abono').val() },
      datatype: 'json',
      success: function (resultado) {
        if (resultado == 1) {
          alert("Inserido com sucesso");
          window.location = 'home.html';
        } else {
          // alert('Erro ao inserir');
          // alert(resultado);
          console.log(resultado);
        }
      },
    }).fail(function (jqXHR, textStatus) {
      console.log(jqXHR);
      console.log(textStatus);
    });
  } else {
    alert('Preencha Todos os campos!');
  }
}



$("#input_abono_dias").keyup(function () {
  var date = new Date($('#input_data_abono').val());
  date.setDate(date.getDate() + 1 + parseInt($("#input_abono_dias").val()));
  var d = ("0" + date.getDate()).slice(-2);
  var m = ("0" + (date.getMonth() + 1)).slice(-2);
  var y = date.getFullYear();
  $('#input_final_abono').attr("placeholder", d + '-' + m + '-' + y);
  $('#input_final_abono').val(d + '-' + m + '-' + y);
});

$("#btn_listar").click(function () {
  window.open('abono_listar.html', 'newwindow', 'width=300,height=250');
  return false;
});

