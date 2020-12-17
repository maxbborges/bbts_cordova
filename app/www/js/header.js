// $(document).on('deviceready', function(){
//   if ('x'=='y'){
//     $('.comLogin').show();
//   } else {
//     $('.comLogin').hide();
//   }
// });

// REMOVE OS ELEMENTOS QUE NÃO PODEM SER EXIBIDOS SEM LOGIN
function removerDivs() {
  if (window.localStorage.getItem('usuario_bbts') != null) {
    preencheDivs();
    var remover = document.querySelectorAll("#btn_login")[0];
    if (remover != null) {
      remover.parentNode.removeChild(remover);
    }
  } else {
    remover = document.querySelectorAll(".comLogin");
    if (remover != null) {
      for (i = 0; i < remover.length; i++) {
        remover[i].parentNode.removeChild(remover[i]);
      }
    }
  }
}

// PREENCHE OS ELEMENTOS QUE SÃO PREENCHIDOS APÓS O LOGIN
function preencheDivs(){
  var atributos = window.localStorage.getItem('atributos');
  var nome = ((window.localStorage.getItem('usuario_bbts')).split(' '))[0];
  var atributos = ((window.localStorage.getItem('atributos')).split(','))[0];
  $("#dropdown_nome").text(nome);
  $("#dropdownAtrib").text(atributos);
  $("#dropdownMat").text(window.localStorage.getItem('matricula'));

  $("#btn_logout").click(function () {
    alert('sair!');
    localStorage.clear();
    location.reload();
  });
}

// VERIFICA O ENDEREÇO E ATRIBUI O RESPECTIVO HEADER
$(document).ready(function () {
  if ((window.location.pathname).indexOf("paginas") == -1) {
    $("header").load("paginas/header_index.html", function () {
      removerDivs();
    });
  } else {
    $("header").load("header.html", function () {
      removerDivs();
    });
  }
});
