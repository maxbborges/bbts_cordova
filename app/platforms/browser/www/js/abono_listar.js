$.getJSON("../js/teste.json", function (json) {
    url = json.parametros.url
    listarAbonos(url);
});

function listarAbonos(url) {
    $('#linhas_abonos').html('');
    $.ajax({
        type: "GET",
        url: url + "/admin.php?listarAbonos&matricula=" + window.localStorage.getItem('matricula'),
        datatype: 'json',
        success: function (resultado) {
            var atributos = (localStorage.getItem('atributos')).split(',');
            console.log(atributos.length)
            for (var i = 0; i < resultado.length; i++) {
                if (atributos.length == 3) {
                    $('#linhas_abonos').append(
                        '<tr><td>' + resultado[i]['nome'] +
                        '</td><td>' + resultado[i]['data_inicial'] +
                        '</td><td>' + resultado[i]['data_final'] +
                        '</td><td>' + resultado[i]['data_solicitacao'] +
                        '</td><td>' + resultado[i]['status'] +
                        '</td><td><button class="btn-success" onclick=solicitacaoFolgas(' + resultado[i]['id'] + ',"abonos","Aprovado")>AP</button><button class="btn-danger" onclick=solicitacaoFolgas(' + resultado[i]['id'] + ',"abonos","Rejeitado")>RP</button>' +
                        '</td></tr>');
                } else {
                    var remover = document.querySelectorAll("#gerenciar")[0];
                    if (remover != null) {
                        remover.parentNode.removeChild(remover);
                    }
                    $('#linhas_abonos').append(
                        '<tr><td>' + resultado[i]['nome'] +
                        '</td><td>' + resultado[i]['data_inicial'] +
                        '</td><td>' + resultado[i]['data_final'] +
                        '</td><td>' + resultado[i]['data_solicitacao'] +
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