<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

if (isset($_GET['logar'])){
  require_once './connection.php';

  $resultado = [];
  $consulta = mysqli_query($link,"select matricula,nome,chave_c,email from funcionario");

  while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
    array_push($resultado,$linha);
  }

  mysqli_close($link);
  header('Content-type: application/json');
  echo json_encode($resultado);
}

if (isset($_GET['listarFerias'])){
  require_once './connection.php';

  $resultado = [];
  $consulta = mysqli_query($link,"select data_inicial,data_final,data_solicitacao,num_abono,adiantamento,nome from ferias,funcionario where matricula_funcionario=matricula;");

  while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
    array_push($resultado,$linha);
  }

  mysqli_close($link);
  header('Content-type: application/json');
  echo json_encode($resultado);
}

if (isset($_GET['listarAbonos'])){
  require_once './connection.php';

  $resultado = [];
  $consulta = mysqli_query($link,"select nome,data_inicial,data_final,data_solicitacao from abonos,funcionario where matricula_funcionario=matricula;");

  while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
    array_push($resultado,$linha);
  }

  mysqli_close($link);
  header('Content-type: application/json');
  echo json_encode($resultado);
}

if (!empty($_POST)) {
  require_once './connection.php';
  if ($_POST['acao']=='inserirFuncionario'){
    $nome = isset($_POST['nome']) ? $_POST['nome'] : NULL;
    $chavec = isset($_POST['chavec']) ? $_POST['chavec'] : NULL;
    $matricula = isset($_POST['matricula']) ? $_POST['matricula'] : NULL;
    $email = isset($_POST['email']) ? $_POST['email'] : NULL;
    // $telefone = isset($_POST['telefone']) ? $_POST['telefone'] : NULL;
    $linha = "insert into funcionario (nome,chave_c,matricula,email) values ('".$nome."','".$chavec."',".$matricula.",'".$email."');";
    $consulta = mysqli_query($link,$linha);

    mysqli_close($link);
    echo $consulta;
  } else if ($_POST['acao']=='inserirFerias'){
    $dataInicial = date("Y-m-d", strtotime($_POST['dataInicial']));
    $dataFinal = date("Y-m-d", strtotime($_POST['dataFinal']));
    $linha = "insert into ferias (data_inicial,data_final,data_solicitacao,num_abono,adiantamento,matricula_funcionario,status) values ('".$dataInicial."','".$dataFinal."','".date('Y-m-d')."',".$_POST['numAbono'].",".(int)$_POST['adiantamento'].",".(int)$_POST['matricula'].",'Pendente');";
    $consulta = mysqli_query($link,$linha);
    mysqli_close($link);
    echo $consulta;

  } else if ($_POST['acao']=='inserirAbono'){
    $dataInicial = date("Y-m-d", strtotime($_POST['dataInicial']));
    $dataFinal = date("Y-m-d", strtotime($_POST['dataFinal']));

    $linha = "insert into abonos (data_inicial,data_final,data_solicitacao,matricula_funcionario) values ('".$dataInicial."','".$dataFinal."','".date('Y-m-d')."',".(int)$_POST['matricula'].");";
    $consulta = mysqli_query($link,$linha);
    mysqli_close($link);
    echo $consulta;
  }
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
