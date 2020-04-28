<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if (isset($_GET['listarEventos'])){
  require_once './connection.php';

  $resultado = [];
  $consulta = mysqli_query($link,"select * from ferias");

  while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
    array_push($resultado,$linha);
  }

  mysqli_close($link);
  header('Content-type: application/json');
  echo json_encode($resultado);
}

?>
