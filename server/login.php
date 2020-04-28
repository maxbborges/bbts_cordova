<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once './connection.php';
 if (!empty($_POST)) {
   $login = isset($_POST['login']) ? $_POST['login'] : NULL;
   $password = isset($_POST['password']) ? $_POST['password'] : NULL;
   $check = "select nome,atributo,matricula from funcionario,atributos where matricula=".(int)$login." and senha=md5('".$password."') and matricula=matricula_funcionario;";

   if ($result = mysqli_query($link,$check)) {
     while ($row = $result->fetch_assoc()) {
       $nome = $row['nome'];
       $matricula = $row['matricula'];
       $atributos[] =  $row['atributo'];
    }
    header('Content-Type: application/json;charset=utf-8');
    echo json_encode(array('usuario_bbts'=>$nome,'atributos'=>$atributos,'matricula'=>$matricula));
    $result->close();
  } else {
    echo 0;
  }
 } else {
    echo 0;
  }
