<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

require_once './connection.php';

if (!empty($_POST)) {
  echo var_dump($_POST);
  $nome = isset($_POST['nome']) ? $_POST['nome'] : NULL;
  $chavec = isset($_POST['chavec']) ? $_POST['chavec'] : NULL;
  $matricula = isset($_POST['matricula']) ? $_POST['matricula'] : NULL;
  $email = isset($_POST['email']) ? $_POST['email'] : NULL;
  $telefone = isset($_POST['telefone']) ? $_POST['telefone'] : NULL;
  $linha = "insert into funcionario (nome,chave_c,matricula,email,telefone) values ('".$nome."','".$chavec."',".$matricula.",'".$email."',".(int)$telefone.");";
  $consulta = mysqli_query($link,$linha);

  echo var_dump($linha);

  // Verifica se a variável $_POST['nome'] existe
} else {
  echo "Não houve submit no formulário";
}

// if(!empty($_POST)){
//   echo 'a';
//   if (!isset($_POST){
//     echo 'xy';
//   }
//   // if(isset($_POST['dados_funcionario']){
//   //
//   // }
// } else {
//   echo 'x';
// }
