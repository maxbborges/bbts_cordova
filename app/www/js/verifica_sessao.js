if (window.localStorage.getItem('login')=='true'){
  if (window.location['href']==(window.location['origin']+'/')||window.location.pathname=='/android_asset/www/index.html'){
    window.location = 'paginas/home.html';
  } else if ((window.location.pathname).indexOf("paginas/login.html")>-1){
    window.location = 'home.html';
  }
} else {
  console.log(window.location.pathname);
  if((window.location.pathname).indexOf("paginas")>-1&&((window.location.pathname).indexOf("paginas/login.html")==-1)){
      window.location = 'login.html';
  } else if ((window.location.pathname).indexOf("paginas/login.html")==-1&&(window.location.pathname).indexOf("/")==-1) {
      window.location = 'paginas/login.html';
  }
}




//
//
// if (window.localStorage.getItem('autenticacao')!=null&&window.localStorage.getItem('autenticacao')!='undefined'&&window.localStorage.getItem('autenticacao')!=false){
//   if (window.location['href']==(window.location['origin']+'/')||window.location.pathname=='/android_asset/www/index.html'){
//     window.location = 'paginas/home.html';
//   } else if (((window.location.pathname).indexOf("paginas/index.html")>-1)||((window.location.pathname).indexOf("paginas/termos_condicoes.html")>-1)){
//     window.location = 'home.html';
//   }
// } else {
//   if((window.location.pathname).indexOf("paginas")>-1&&((window.location.pathname).indexOf("paginas/index.html")==-1)&&((window.location.pathname).indexOf("paginas/termos_condicoes")==-1)){
//       window.location = 'index.html';
//   } else if (((window.location.pathname).indexOf("paginas/index.html")==-1)&&((window.location.pathname).indexOf("paginas/termos_condicoes")==-1)) {
//       window.location = 'paginas/index.html';
//   }
// }
