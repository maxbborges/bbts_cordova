
$('#calendario_home').ready(function () {
  calendario();
})

function calendario (){
  const days2020 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const days2021 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var d = new Date();
  var n = d.getMonth();

  var inicio_mes1 = new Date(d.getFullYear(), n, 1);
  var inicio_mes2 = new Date(d.getFullYear(), n+1, 1);
  var inicio_mes3 = new Date(d.getFullYear(), n+2, 1);
  //
  // var fim_mes1 = new Date(d.getFullYear(), n, 0);
  // var fim_mes2 = new Date(d.getFullYear(), n+1, 0);
  // var fim_mes3 = new Date(d.getFullYear(), n+2, 0);

  for (var x=1, y=inicio_mes1.getDay();x<=days2020[n];x++,y++){
    if(y%7==0&&y!=0){
      $('#calendario1').append('<tr></tr>');
    }

    if (x==1){
      for (z=0;z<y;z++){
        $('#calendario1').append('<td></td>');
      }
    }


    $('#calendario1').append('<td class="td'+x+'">'+x+'</td>');
  }

  for (var x=1, y=inicio_mes2.getDay();x<=days2020[n+1];x++,y++){
    if(y%7==0&&y!=0){
      $('#calendario2').append('<tr></tr>');
    } else if (x==1){
      for (z=0;z<y;z++){
        $('#calendario2').append('<td></td>');
      }
    }
    $('#calendario2').append('<td class="td'+x+'">'+x+'</td>');
  }

  for (var x=1, y=inicio_mes3.getDay();x<=days2020[n+2];x++,y++){
    if(y%7==0&&y!=0){
      $('#calendario3').append('<tr></tr>');
    } else if (x==1){
      for (z=0;z<y;z++){
        $('#calendario3').append('<td></td>');
      }
    }
    $('#calendario3').append('<td class="td'+x+'">'+x+'</td>');
  }
}
