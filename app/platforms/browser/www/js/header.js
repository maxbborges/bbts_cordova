$( document ).ready(function() {
  if ((window.location.pathname).indexOf("paginas/login.html")==1){
    $("header").load("header_login.html", function(){
    })
  } else if ((window.location.pathname).indexOf("paginas")==-1){
    $("header").load("paginas/header_index.html", function(){
    });
  } else {
    $("header").load("header.html", function(){
      $("#btn_logout").click(function(){
        alert('sair!');
        localStorage.clear();
        location.reload();
      });
    });
  }
});
