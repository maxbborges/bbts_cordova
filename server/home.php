<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if (isset($_GET['listarEventos'])){
  require_once './connection.php';

  $resultado = [];
  $consulta = mysqli_query($link,"select * from ferias where MONTH(data_inicial ) BETWEEN (MONTH(CURDATE())-1) and (MONTH(CURDATE())+3) order by data_inicial;");
  while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
    array_push($resultado,$linha);
  }

  $resultado1 = [];
  $consulta1 = mysqli_query($link,"select * from abonos where MONTH(data_inicial ) BETWEEN (MONTH(CURDATE())-1) and (MONTH(CURDATE())+3) order by data_inicial,data_final;");
  while ($linha = mysqli_fetch_array($consulta1,MYSQLI_ASSOC)){
    array_push($resultado1,$linha);
  }

  mysqli_close($link);
  header('Content-type: application/json');
  echo json_encode(array('ferias'=>$resultado,'abonos'=>$resultado1));
}

?>
