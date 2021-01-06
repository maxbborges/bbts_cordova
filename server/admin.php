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
  $tipo= $_GET['tipo'];
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

      $consulta = mysqli_query($link,"select f2.id,a.matricula_funcionario, a.data_cadastro , f2.data_inicio , f2.data_fim, f2.numero_abonos, f2.adiantamento, f2.status from ferias_abonos f2, administrativo a, faltas_folgas ff where f2.id_faltas_folgas = ff.id and ff.id_administrativo = a.id and YEAR(f2.data_inicio)>=YEAR(CURDATE()) and MONTH(f2.data_inicio)>=MONTH(CURDATE()) and tipo=".$tipo.";");
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
    $dataFinal = date("Y-m-d 23:59:59", strtotime($_POST['dataFinal']));
    $all_query_ok=true;
    mysqli_autocommit($link, FALSE);

    $link->query("INSERT INTO administrativo (matricula_funcionario ,data_cadastro ,data_alteracao ) VALUES (".(int)$_POST['matricula'].",CURDATE(),CURDATE());") ? null : $all_query_ok=false;
    $link->query("INSERT INTO faltas_folgas (id_administrativo) VALUES (LAST_INSERT_ID());")? null : $all_query_ok=false;
    $link->query("INSERT INTO ferias_abonos (id_faltas_folgas,numero_abonos ,adiantamento,data_inicio,data_fim,status,tipo ) VALUES (LAST_INSERT_ID(),0,'false','".$dataInicial."','".$dataFinal."','pendente','ferias');")? null : $all_query_ok=false;
    
    $all_query_ok ? $link->commit() : $link->rollback();
    echo $all_query_ok ? '1' : '0';
    $link->close();

  } else if ($_POST['acao']=='inserirAbono'){
    $dataInicial = date("Y-m-d", strtotime($_POST['dataInicial']));
    $dataFinal = date("Y-m-d 23:59:59", strtotime($_POST['dataFinal']));
    $all_query_ok=true;
    mysqli_autocommit($link, FALSE);

    $link->query("INSERT INTO administrativo (matricula_funcionario ,data_cadastro ,data_alteracao ) VALUES (".(int)$_POST['matricula'].",CURDATE(),CURDATE());") ? null : $all_query_ok=false;
    $link->query("INSERT INTO faltas_folgas (id_administrativo) VALUES (LAST_INSERT_ID());")? null : $all_query_ok=false;
    $link->query("INSERT INTO ferias_abonos (id_faltas_folgas,numero_abonos ,adiantamento,data_inicio,data_fim,status,tipo ) VALUES (LAST_INSERT_ID(),0,'false','".$dataInicial."','".$dataFinal."','pendente','abonos');")? null : $all_query_ok=false;
    
    $all_query_ok ? $link->commit() : $link->rollback();
    echo $all_query_ok ? '1' : '0';
    $link->close();
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

      $all_query_ok=true;
      mysqli_autocommit($link, FALSE);
      $link->query("update ferias_abonos set status='".$status."' where id=".(int)$id.";") ? null : $all_query_ok=false;
      
      $all_query_ok ? $link->commit() : $link->rollback();
      echo $all_query_ok ? '1' : '0';
      $link->close();


      // $consulta1 = mysqli_query($link,"update ".$tipo." set status='".$status."' where id=".(int)$id.";");
      // mysqli_close($link);
      // header('Content-type: application/json');
      // echo json_encode($consulta1);
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
