<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once './connection.php';

 if (!empty($_POST)) {
   $login = isset($_POST['login']) ? $_POST['login'] : NULL;
   $password = isset($_POST['password']) ? $_POST['password'] : NULL;
   $check = "select id from funcionario where matricula=".(int)$login.";";
   $consulta = mysqli_query($link,$check);
   if (($consulta->fetch_row())[0] == null){
     echo 0;
   }else {
     echo 1;
   }
 } else {
    echo "erro";
  }
?>
