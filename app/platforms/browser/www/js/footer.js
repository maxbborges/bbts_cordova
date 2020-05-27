$( document ).ready(function() {
  if ((window.location.pathname).indexOf("paginas")==-1){
    $("footer").load("paginas/footer.html", function(){
    });
  } else {
    $("footer").load("footer.html", function(){
    });
  }
});
