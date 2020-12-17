<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if (isset($_GET['listarEventos'])){
  require_once './connection.php';
  $consulta = mysqli_query($link,"SELECT f.id,f.status,f.numero_abonos,f.adiantamento,a.data_cadastro,f.data_inicio, f.data_fim, f.tipo, a.matricula_funcionario, (SELECT nome FROM dados_pessoais dp , dados_funcionario df where df.matricula_funcionario = 112243 and dp.id_funcionario = df.id) as nome  FROM ferias_abonos f, faltas_folgas ff , administrativo a WHERE f.id_faltas_folgas = ff.id and ff.id_administrativo = a.id and a.matricula_funcionario = 112243 ORDER BY f.data_inicio;");

  $faltas = [];

  // $consulta = mysqli_query($link,"select id, matricula_funcionario , num_abono , adiantamento , status, data_inicial , data_final , data_solicitacao , nome from ferias , funcionario where matricula_funcionario = matricula and MONTH(data_inicial ) BETWEEN (MONTH(CURDATE())-1) and (MONTH(CURDATE())+3) order by data_inicial;");
  while ($linha = mysqli_fetch_array($consulta,MYSQLI_ASSOC)){
    array_push($faltas,$linha);
  }

  mysqli_close($link);
  header('Content-type: application/json');
  echo json_encode(array('faltas'=>$faltas));
}

?>
