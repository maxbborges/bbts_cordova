<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once './connection.php';
$resultado = [];
$consulta = mysqli_query($link,"select id,nome,chave_c,matricula,email,telefone from funcionario");

while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
  array_push($resultado,$linha);
}
header('Content-type: application/json');
echo json_encode($resultado);

?>
