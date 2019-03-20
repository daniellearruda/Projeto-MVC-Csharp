$(document).ready(function () {
    var id = $("#id").val();

    //verifica se recebeu id
    if (id > 0) {
        //HabilitaForm();
        //CarregaTipoServico(id)
        CarregaDados(id);
        // Preencher formulario
        DesabilitaForm();

        $("#Alterar").prop("disabled", false);
        $("#Excluir").prop("disabled", false);
        $("#ValidaCadastro").prop("disabled", true);
    } else {
        //Formulario novo
        HabilitaForm();
        $("#Excluir").prop("disabled", true);
        $("#ValidaCadastro").prop("disabled", false);
        $("#Alterar").prop("disabled", true);
    }
    

    $('#ValidaCadastro').click(function () {
        if (validaDados()) {
            $('#myModal').modal('show');
        } else {
            $('#myModal').modal('hide');
        }
    });

    $('#Salvar').click(function () {
        Salvar();
    });

    $('#Alterar').click(function () {
        HabilitaForm();
        $("#ValidaCadastro").prop("disabled", false);
        $("#Alterar").prop("disabled", true);
        $("#Excluir").prop("disabled", true);

    });
    $('#Excluir').click(function () {
        ExclusaoLogica();
        return false;
    });



    function validaDados() {

        var mensagem = "";

        if ($("#nome").val() === null || $("#nome").val() === "") {
            $("#nome").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|nome|";
        } else {
            $("#nome").css({ "border-color": "blue", "padding": "1px" });
        }

        
        if ($("#senha").val() === null || $("#senha").val() === "") {
            $("#senha").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|senha|";
        } else {
            $("#senha").css({ "border-color": "blue", "padding": "1px" });
        }

        if ($("#login").val() === null || $("#login").val() === "") {
            $("#login").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|login|";
        } else {
            $("#login").css({ "border-color": "blue", "padding": "1px" });
        }
        if (mensagem !== "")//se a variavel mensagem tiver  conteudo,ou seja ,se tiver ocorrido ,algum erro no preenchimento
        {
            $("#resposta").addClass("alert alert-danger");
            $('#resposta').html('Verifique o formulário, existem campos obrigatórios não preenchidos');
            $('#resposta').show(); //MOSTRA A DIV DE RESPOSTA
            return false;
        } else { // se não
            $('#resposta').html('');
            $('#resposta').hide();
            return true;
        }

        //return true;
    }

    function CarregaDados(id) {
        $.ajax({
            url: "/Usuario/CarregaDados/" + id,
            success: function (data) {
                console.log(data);
                $.each(data, function (i, element) {
                    $("#nome").val(element.Nome);
                    $("#login").val(element.Login);
                    $("#senha").val(element.Senha);                    
                });
            }
        });

    }


    function Salvar() {
        if (id > 0) {
            Put(id);

        } else {
            Post();


        }
    }

    function ExclusaoLogica() {
        bootbox.confirm({
            title: "Excluir Registro?",
            message: 'Confirma a exclusão lógica do registro?',
            callback: function (confirmacao) {

                if (confirmacao) {
                    Delete(id);
                } else {
                    //bootbox.alert('Operação cancelada.');

                }
            },
            buttons: {
                cancel: { label: 'Cancelar', className: 'btn-default' },
                confirm: { label: 'EXCLUIR', className: 'btn-danger' }

            }
        });
    }

    function Post() {
        var dados = $("Form").serialize();

        jQuery.ajax({
            type: "POST",
            url: "/Usuario/Salvar",
            dataType: "json",
            data: dados,
            success: function (data) {
                //fecha o modal de confimação
                $('#myModal').modal('hide');

                //retorna uma resposta de sucesso NA DIV RESPOSTA            
                $("#resposta").addClass("alert alert-success");     // COLOCA NA CLASSE DE SUCESSO (VERDE)        
                $('#resposta').html('Registro Salvo com sucesso!'); //CRIA A MENSAGEM
                $('#resposta').show(); //MOSTRA A DIV DE RESPOSTA          

                //SOME COM A DIV DE RESPOSTA APÓS 3 SEGUNDOS
                setTimeout(function () {
                    $('#resposta').fadeOut('fast');
                    window.location.assign("/Usuario/Index");
                }, 1000);


            },
            error: function (request, status, erro) {
                console.log("erro");

                $("#resposta").addClass("alert alert-danger");
                $('#resposta').html('Registro NÃO FOI SALVO, FAVOR ENTRE EM CONTATO COM O SETOR DE TECNOLOGIA DA INFORMAÇÃO!');
                $('#resposta').show();

                setTimeout(function () {
                    $('#resposta').fadeOut('fast');
                }, 1000);

            },
            complete: function (jqXHR, textStatus) {
                // colocar aqui algo que deseja que faça ao terminar todo o processo (finnaly)
            }
        });
    }

    function Put(id) {
        var dados = $("Form").serialize();

        jQuery.ajax({
            type: "PUT",
            url: "/Usuario/Editar",
            dataType: "json",
            data: dados,
            success: function (data) {
                //fecha o modal de confimação
                $('#myModal').modal('hide');

                //retorna uma resposta de sucesso NA DIV RESPOSTA            
                $("#resposta").addClass("alert alert-success");     // COLOCA NA CLASSE DE SUCESSO (VERDE)        
                $('#resposta').html('Registro ALTERADO com sucesso!'); //CRIA A MENSAGEM
                $('#resposta').show(); //MOSTRA A DIV DE RESPOSTA

                //SOME COM A DIV DE RESPOSTA APÓS 3 SEGUNDOS
                setTimeout(function () {
                    $('#resposta').fadeOut('fast');
                    window.location.assign("/Usuario/Cadastro/" + id);
                }, 1000);
                //Redireciona após 5 segundos
                setTimeout(function () {
                    window.location.assign("/Usuario/Cadastro/" + id);
                }, 1000);


            },
            error: function (request, status, erro) {

                $("#resposta").addClass("alert alert-danger");
                $('#resposta').html('Registro NÃO FOI ALTERADO, FAVOR ENTRE EM CONTATO COM O SETOR DE TECNOLOGIA DA INFORMAÇÃO!');
                $('#resposta').show();
                //some com a div após 3 segundos
                setTimeout(function () { $('#resposta').fadeOut('fast'); }, 1000);

            },
            complete: function (jqXHR, textStatus) {
                // colocar aqui algo que deseja que faça ao terminar todo o processo (finnaly)
            }
        });
    }

    function Delete(id) {
        var dados = $("Form").serialize();

        jQuery.ajax({
            type: "Delete",
            url: "/Usuario/Exclusao/" + id,
            dataType: "json",
            data: dados,
            success: function (data) {
                //fecha o modal de confimação
                $('#myModal').modal('hide');

                //retorna uma resposta de sucesso NA DIV RESPOSTA            
                $("#resposta").addClass("alert alert-danger");     // COLOCA NA CLASSE DE SUCESSO (VERDE)        
                $('#resposta').html('Registro Excluído com sucesso!'); //CRIA A MENSAGEM
                $('#resposta').show(); //MOSTRA A DIV DE RESPOSTA

                //SOME COM A DIV DE RESPOSTA APÓS 3 SEGUNDOS
                setTimeout(function () {
                    $('#resposta').fadeOut('fast');
                    window.location.assign("/Usuario/Index");
                }, 1000);
            },
            error: function (request, status, erro) {
                console.log("erro");

                $("#resposta").addClass("alert alert-danger");
                $('#resposta').html('Registro NÃO FOI EXCLUÍDO, FAVOR ENTRE EM CONTATO COM O SETOR DE TECNOLOGIA DA INFORMAÇÃO!');
                $('#resposta').show();

                setTimeout(function () {
                    $('#resposta').fadeOut('fast');
                }, 1000);

            },
            complete: function (jqXHR, textStatus) {

            }
        });
    }

    // codigo que tira a incompatibilidade do msi
    jQuery.browser = {};
    (function () {
        jQuery.browser.msie = false;
        jQuery.browser.version = 0;
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
            jQuery.browser.msie = true;
            jQuery.browser.version = RegExp.$1;
        }
    })();
});// fecha $(document).ready JS