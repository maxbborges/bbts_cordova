$( document ).ready(function() {
  if ((window.location.pathname).indexOf("paginas")==-1){
    $("header").load("paginas/header_index.html", function(){
    });
  } else {
    $("header").load("header.html", function(){
      // var nome = window.localStorage.getItem('usuario_bbts');
      // var atributos = window.localStorage.getItem('atributos');
      // var nome = ((window.localStorage.getItem('usuario_bbts')).split(' '))[0];
      // var atributos = ((window.localStorage.getItem('atributos')).split(','))[0];
      // $("#dropdownMenuButton").html(nome);
      // $("#dropdownAtrib").html(atributos);
      // $("#dropdownMat").html(window.localStorage.getItem('matricula'));
      //
      // $("#btn_logout").click(function(){
      //   alert('sair!');
      //   localStorage.clear();
      //   location.reload();
      // });
    });
  }
});
