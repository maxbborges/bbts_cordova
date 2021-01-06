$.getJSON("../js/teste.json", function (json) {
    url = json.parametros.url
    listarFerias(url);
});

function listarFerias(url) {
    $('#linhas_ferias').html('');
    $.ajax({
        type: "GET",
        url: url + "/admin.php?listarFerias&matricula=" + window.localStorage.getItem('matricula')+"&tipo='ferias'",
        datatype: 'json',
        success: function (resultado) {
            console.log(resultado)
            var atributos = (localStorage.getItem('atributos')).split(',');
            // console.log(atributos)
            for (var i = 0; i < resultado.length; i++) {
                if (atributos.length == 1) {
                    console.log(resultado[i]);
                    $('#linhas_ferias').append(
                        '<tr><td>' + resultado[i]['matricula_funcionario'] +
                        '</td><td>' + resultado[i]['data_inicio'] +
                        '</td><td>' + resultado[i]['data_fim'] +
                        '</td><td>' + resultado[i]['data_cadastro'] +
                        '</td><td>' + resultado[i]['numero_abonos'] +
                        '</td><td>' + resultado[i]['adiantamento'] +
                        '</td><td>' + resultado[i]['status'] +
                        '</td><td><button class="btn-success" onclick=solicitacaoFolgas(' + resultado[i]['id'] + ',"ferias","Aprovado")>AP</button><button class="btn-danger" onclick=solicitacaoFolgas(' + resultado[i]['id'] + ',"ferias","Rejeitado")>RP</button>' +
                        '</td></tr>');
                } else {
                    var remover = document.querySelectorAll("#gerenciar")[0];
                    if (remover != null) {
                        remover.parentNode.removeChild(remover);
                    }
                    $('#linhas_ferias').append(
                        '<tr><td>' + resultado[i]['matricula_funcionario'] +
                        '</td><td>' + resultado[i]['data_inicio'] +
                        '</td><td>' + resultado[i]['data_fim'] +
                        '</td><td>' + resultado[i]['data_cadastro'] +
                        '</td><td>' + resultado[i]['numero_abonos'] +
                        '</td><td>' + resultado[i]['adiantamento'] +
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
            if (resultado == 1){
                alert('Status Modificado para ' + status + '!');
                location.reload();
            } else {
                alert('Erro!');
            }
            
        },
    }).fail(function (jqXHR, textStatus) {
        console.log(jqXHR);
    });
}