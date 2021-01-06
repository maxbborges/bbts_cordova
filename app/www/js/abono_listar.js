$.getJSON("../js/teste.json", function (json) {
    url = json.parametros.url
    listarAbonos(url);
});

function listarAbonos(url) {
    $('#linhas_abonos').html('');
    $.ajax({
        type: "GET",
        url: url + "/admin.php?listarFerias&matricula=" + window.localStorage.getItem('matricula')+"&tipo='abonos'",
        datatype: 'json',
        success: function (resultado) {
            var atributos = (localStorage.getItem('atributos')).split(',');
            console.log(resultado)
            for (var i = 0; i < resultado.length; i++) {
                if (atributos.length == 1) {
                    $('#linhas_abonos').append(
                        '<tr><td>' + resultado[i]['matricula_funcionario'] +
                        '</td><td>' + resultado[i]['data_inicio'] +
                        '</td><td>' + resultado[i]['data_fim'] +
                        '</td><td>' + resultado[i]['data_cadastro'] +
                        '</td><td>' + resultado[i]['status'] +
                        '</td><td><button class="btn-success" onclick=solicitacaoFolgas(' + resultado[i]['id'] + ',"abonos","Aprovado")>AP</button><button class="btn-danger" onclick=solicitacaoFolgas(' + resultado[i]['id'] + ',"abonos","Rejeitado")>RP</button>' +
                        '</td></tr>');
                } else {
                    var remover = document.querySelectorAll("#gerenciar")[0];
                    if (remover != null) {
                        remover.parentNode.removeChild(remover);
                    }
                    $('#linhas_abonos').append(
                        '<tr><td>' + resultado[i]['matricula_funcionario'] +
                        '</td><td>' + resultado[i]['data_inicio'] +
                        '</td><td>' + resultado[i]['data_fim'] +
                        '</td><td>' + resultado[i]['data_cadastro'] +
                        '</td><td>' + resultado[i]['status'] +
                        '</td></tr>');
                }
            }
        },
    });
}

function solicitacaoFolgas(id, tipo, status) {
    $.ajax({
        type: "POST",
        url: url + "/admin.php",
        data: { 'acao': 'aceitarFolgas', 'id': id, 'tipo': tipo, 'status': status },
        datatype: 'json',
        success: function (resultado) {
            alert('Status Modificado para ' + status + '!');
            location.reload();
        },
    }).fail(function (jqXHR, textStatus) {
        console.log(jqXHR);
    });
}