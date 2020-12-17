<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once './connection.php';
 if (!empty($_POST)) {
   $login = isset($_POST['login']) ? $_POST['login'] : NULL;
   $password = isset($_POST['password']) ? $_POST['password'] : NULL;
  //  $check = "select nome,atributo,matricula from funcionario,atributos where matricula=".(int)$login." and senha=md5('".$password."') and matricula=matricula_funcionario;";
  $check = "select 'senhas', a.matricula_funcionario as dados from senhas s, administrativo a, seguranca s2 where a.matricula_funcionario =".(int)$login." and s2.id_administrativo = a.id and s.id_seguranca = s2.id and s.senhas=md5('".$password."') UNION ALL select 'regras', count(role) from roles r2 , administrativo a, seguranca s2 where a.matricula_funcionario =112243 and s2.id_administrativo = a.id and r2.id_seguranca = s2.id UNION SELECT 'funcionario', nome FROM dados_pessoais dp , dados_funcionario df where df.matricula_funcionario = ".(int)$login." and dp.id_funcionario = df.id;";

   if ($result = mysqli_query($link,$check)) {
     while ($row = $result->fetch_assoc()) {
       $atributos[] =  $row['dados'];
    }
    header('Content-Type: application/json;charset=utf-8');
    echo json_encode(array('matricula'=>$atributos[0],'atributos'=>$atributos[1],'usuario_bbts'=>$atributos[2]));
    $result->close();
  } else {
    echo 0;
  }
 } else {
    echo 0;
  }
