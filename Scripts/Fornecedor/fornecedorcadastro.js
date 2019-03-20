$(document).ready(function () {
    var id = $("#id").val();
    
    CarregaEmpresa();

    if (id > 0) {
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
    jQuery(function ($) {
       // $("#cnpj").mask("99.999.999/9999-99");
        $("#telefone").mask("(99)9999-9999");
        $("#dataNascimento").mask("99/99/9999");
    });

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

    $('select#tipo').on("change", function () {
        var id = $("#tipo").val();

        if (id === "0") {
            DesabilitaForm();
            $("#tipo").prop("disabled", false);
        } else {
            HabilitaForm();
            if (id === "F") {

                $("#cnpj").unmask().mask("999.999.999-99");
                $("#rg").prop("disabled", false);
                $("#dataNascimento").prop("disabled", false);

            } else {
               
                $("#cnpj").unmask().mask("99.999.999/9999-99");
                $("#rg").prop("disabled", true);
                $("#dataNascimento").prop("disabled", true);
            }
        }    
      
    });

    function validaDados() {
        var mensagem = "";
        var estadoEmpresa = $('#empresa :selected').attr('dado');

        if ($("#tipo").val() === null || $("#tipo").val() === "0" || $("#tipo").val() === "") {
            $("#tipo").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|tipo|";
        } else {
            $("#tipo").css({ "border-color": "blue", "padding": "1px" });
        }
       
        if ($("#Nome").val() === null || $("#Nome").val() === "") {
            $("#Nome").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|Nome|";
        } else {
            $("#Nome").css({ "border-color": "blue", "padding": "1px" });
        }

        if ($("#cnpj").val() === null || $("#cnpj").val() === "__.___.___/____-__" || $("#cnpj").val() === "") {
            $("#cnpj").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|cnpj|";
        } else {
            $("#cnpj").css({ "border-color": "blue", "padding": "1px" });
        }

        if ($("#telefone").val() === null || $("#telefone").val() === "(__)____-____" || $("#telefone").val() === "") {
            $("#telefone").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|cnpj|";
        } else {
            $("#telefone").css({ "border-color": "blue", "padding": "1px" });
        }

        if ($("#tipo").val() === "F") {
               //Caso o fornecedor seja pessoa física, também é necessário cadastrar o RG;
            if ($("#rg").val() === null || $("#rg").val() === "") {
                $("#rg").css({ "border-color": "#F00", "padding": "1px" });
                mensagem = mensagem + "|rg|";
            } else {
                $("#rg").css({ "border-color": "blue", "padding": "1px" });
            }

            // data de nascimento obrigatorio caso seja pessoa fisica
            if ($("#dataNascimento").val() === "__/__/____" || $("#dataNascimento").val() === "") {
                $("#dataNascimento").css({ "border-color": "#F00", "padding": "1px" });
                mensagem = mensagem + "|Nascimento|";
                $('#errodata').html('DATA INVÁLIDA!');
            } else {
                if (!fIsDate($("#dataNascimento").val())) {
                    $("#dataNascimento").css({ "border-color": "#F00", "padding": "1px" });
                    $('#errodata').html('DATA INVÁLIDA!');
                } else {
                    $("#dataNascimento").css({ "border-color": "blue", "padding": "1px" });
                }
            }
        }
        

        if ($("#empresa").val() === null || $("#empresa").val() === "" ) {
            $("#empresa").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|empresa|";
        } else {
            if (estadoEmpresa === "PR" && $("#tipo").val() === "F") {
                //Caso a empresa seja do Paraná, não permitir cadastrar um fornecedor pessoa física menor de idade;
                if (!fIsDate($("#dataNascimento").val())) {
                    $("#dataNascimento").css({ "border-color": "#F00", "padding": "1px" });
                    $('#errodata').html('DATA INVÁLIDA!');
                } else {
                    if ($("#dataNascimento").val() === "__/__/____" || $("#dataNascimento").val() === "") {
                        $("#dataNascimento").css({ "border-color": "#F00", "padding": "1px" });
                        $('#errodata').html('DATA DE NASCIMENTO É OBRIGATORIA QUANDO PESSOA FÍSICA!');
                        $("#resposta").addClass("alert alert-danger");
                        mensagem = mensagem + "|Nascimento|";
                    } else {
                        now = new Date;
                        var nascimento = $("#dataNascimento").val();
                        var anoDtNascimento = nascimento.substring(6);
                        var maioridade = now.getFullYear() - anoDtNascimento;

                        if (maioridade >= 18) {
                            $("#dataNascimento").css({ "border-color": "blue", "padding": "1px" });
                            $('#errodata').html('');
                        } else {
                            $("#dataNascimento").css({ "border-color": "red", "padding": "1px" });
                            $('#errodata').html('PARA EMPRESAS DO PARANÁ É NECESSÁRIO SER MAIOR DE IDADE QUANDO PESSOA FÍSICA!');
                            mensagem = mensagem + "|Nascimento|";
                        }
                    }
                }              

            } else {
             
                $("#dataNascimento").css({ "border-color": "blue", "padding": "1px" });
                $("#rg").css({ "border-color": "blue", "padding": "1px" });
                $('#errodata').html('');
               
            }
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
            url: "/Fornecedor/CarregaDados/" + id,
            success: function (data) {
                console.log(data);
                $.each(data, function (i, element) {
                 
                    
                    $("#nome").val(element.Nome);
                    $("#cnpj").val(element.Cpf_Cnpj);
                    if (element.Cpf_Cnpj.length > 15) {
                       
                        $("#cnpj").unmask().mask("99.999.999/9999-99");
                        $("#tipo").val('J');
                        $("#dataNascimento").val(""); 
                        $("#rg").val("");


                    } else {
                        $("#cnpj").unmask().mask("999.999.999-99");
                        
                        

                        $("#tipo").val('F');
                        $("#dataNascimento").val(element.Data_Nascimento);                   
                        $("#rg").val(element.RG);
                    }
                    
                    $("#empresa").val(element.Id_Empresa);
                    $("#telefone").val(element.Telefone);
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
            url: "/Fornecedor/Salvar",
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
                    window.location.assign("/Fornecedor/Index");
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
            url: "/Fornecedor/Editar",
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
                    window.location.assign("/Fornecedor/Cadastro/" + id);
                }, 1000);
                //Redireciona após 5 segundos
                setTimeout(function () {
                    window.location.assign("/Fornecedor/Cadastro/" + id);
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
            url: "/Fornecedor/Exclusao/" + id,
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
                    window.location.assign("/Fornecedor/Index");
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


    function CarregaEmpresa() {
       $.ajax({
            // url: "/Gerenciamento/Setor/Listar",
           url: "/Fornecedor/ListaEmpresa",
            async: false,
            success: function (data) {
                $("#empresa").empty();
                $.each(data, function (i, element) {
                    $("#empresa").append('<option value=' + element.Id + ' dado='+ element.Uf +'>' + element.NomeFantasia + '</option>');
                });
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