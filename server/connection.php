<?php
$link = mysqli_connect("localhost", "maxwell", "123456", "gincana_mctic");

if (!$link) {
    echo "Erro: " . PHP_EOL;
    echo "Codigo: " . mysqli_connect_errno() . PHP_EOL;
    echo "Descrição: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
?>
