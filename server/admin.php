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
  $matricula= $_GET['matricula'];
  require_once './connection.php';

  $resultado = [];

  // $consulta = mysqli_query($link,'select count(*) as contador FROM atributos where matricula_funcionario='.$matricula.';');

  // if(((int)(mysqli_fetch_array($consulta,MYSQLI_ASSOC)['contador']))>=2){
    // $consulta = mysqli_query($link,"select id ,data_inicial,data_final,data_solicitacao,num_abono,adiantamento,nome,status from ferias,funcionario where matricula_funcionario=matricula;");

    // while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
    //   array_push($resultado,$linha);
    // }
  // } else {
    // $consulta = mysqli_query($link,"select id ,data_inicial,data_final,data_solicitacao,num_abono,adiantamento,nome,status from ferias,funcionario where matricula_funcionario=matricula and matricula=".$matricula.';');

    // while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
    //   array_push($resultado,$linha);
    // }
  // }

      $consulta = mysqli_query($link,"select f2.id,a.matricula_funcionario, a.data_cadastro , f2.data_inicio , f2.data_fim from ferias f2, administrativo a, faltas_folgas ff where f2.id_faltas_folgas = ff.id and ff.id_administrativo = a.id ;");
      while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
          array_push($resultado,$linha);
        }

  mysqli_close($link);
  header('Content-type: application/json');
  echo json_encode($resultado);
}

if (isset($_GET['listarAbonos'])){
  require_once './connection.php';
  $matricula= $_GET['matricula'];

  $resultado = [];

  $consulta = mysqli_query($link,'select count(*) as contador FROM abonos where matricula_funcionario='.$matricula.';');

  if(((int)(mysqli_fetch_array($consulta,MYSQLI_ASSOC)['contador']))>=2){
    $consulta = mysqli_query($link,"select id ,nome,data_inicial,data_final,data_solicitacao,status from abonos,funcionario where matricula_funcionario=matricula;");

    while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
      array_push($resultado,$linha);
    }
  } else {
    $consulta = mysqli_query($link,"select id ,nome,data_inicial,data_final,data_solicitacao,status from abonos,funcionario where matricula_funcionario=matricula and matricula=".$matricula.';');

    while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
      array_push($resultado,$linha);
    }
  }

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


    $inserir_dados = "
    START TRANSACTION;
      INSERT INTO administrativo (matricula_funcionario ,data_cadastro ,data_alteracao ) VALUES (112243,'2020-01-01','2020-01-01');
      INSERT INTO faltas_folgas (id_administrativo) VALUES (LAST_INSERT_ID());
      INSERT INTO ferias (id_falta_folgas,numero_abonos ,adiantamento ,status ) VALUES (LAST_INSERT_ID(),0,'false','pendente');
      COMMIT;";




    // $linha = "insert into ferias (data_inicial,data_final,data_solicitacao,num_abono,adiantamento,matricula_funcionario,status) values ('".$dataInicial."','".$dataFinal."','".date('Y-m-d')."',".$_POST['numAbono'].",".(int)$_POST['adiantamento'].",".(int)$_POST['matricula'].",'Pendente');";
    
    
    $consulta = mysqli_query($inserir_dados,$linha) or die(mysqli_error($link);
    mysqli_close($link);
    echo $consulta;

  } else if ($_POST['acao']=='inserirAbono'){
    $dataInicial = date("Y-m-d", strtotime($_POST['dataInicial']));
    $dataFinal = date("Y-m-d", strtotime($_POST['dataFinal']));

    $linha = "insert into abonos (data_inicial,data_final,data_solicitacao,matricula_funcionario,status) values ('".$dataInicial."','".$dataFinal."','".date('Y-m-d')."',".(int)$_POST['matricula'].",'Pendente');";
    $consulta = mysqli_query($link,$linha);
    mysqli_close($link);
    echo $consulta;
  } else if ($_POST['acao']=='trocaSenha'){
      $matricula = isset($_POST['matriculalogin']) ? $_POST['matriculalogin'] : NULL;
      $senhaatual = isset($_POST['senhaatual']) ? $_POST['senhaatual'] : NULL;
      $novasenha = isset($_POST['novasenha']) ? $_POST['novasenha'] : NULL;

      if ($matricula!=null&&$senhaatual!=null&&$novasenha!=null){
        $linha = "select nome from funcionario where matricula = ".(int)$matricula." and senha = md5('".$senhaatual."');";
        $consulta = mysqli_query($link,$linha);
        // $resultado = [];
        while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
          if ($linha != NULL && $linha != "" ){
            $consulta1 = mysqli_query($link,"update funcionario set senha= md5('".$novasenha."') where matricula = ".(int)$matricula.";");
            mysqli_close($link);
            header('Content-type: application/json');
            echo json_encode($consulta1);
          } else {
            echo 0;
          }
        }
      } else {
        echo 0;
      }
    } else if ($_POST['acao']=='aceitarFolgas'){
      $id = $_POST['id'];
      $tipo = $_POST['tipo'];
      $status = $_POST['status'];
      // echo $tipo;
      $consulta1 = mysqli_query($link,"update ".$tipo." set status='".$status."' where id=".(int)$id.";");
      mysqli_close($link);
      header('Content-type: application/json');
      echo json_encode($consulta1);
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
