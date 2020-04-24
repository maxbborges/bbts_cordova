<?php
if ($_SERVER['HTTP_HOST']=='localhost:90'){
  $link = mysqli_connect("localhost", "user", "123456", "banco_bbts");
} else {
  $link = mysqli_connect("localhost", "u293760499_user", "123456", "u293760499_banco_bbts");
}

if (!$link) {
    echo "Erro: " . PHP_EOL;
    echo "Codigo: " . mysqli_connect_errno() . PHP_EOL;
    echo "Descrição: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
?>
