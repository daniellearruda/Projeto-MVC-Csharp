$(document).ready(function () {


    var id = $("#Id").val();
    CarregaMarca();

    //verifica se recebeu id
    if (id > 0) {
        CarregaDados(id);
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
        $("#obs").prop("disabled", false);
        $("#ValidaCadastro").prop("disabled", false);
        $("#Alterar").prop("disabled", true);
        $("#Excluir").prop("disabled", true);
    });

    $('#Excluir').click(function () {
        ExclusaoLogica();
        return false;
    });

    $('select#marca').on("change", function () {
        var value = $("#marca").val();
        CarregaModelo(value,'');        
        $("#versao").empty();
        $("#quiAno").empty();
        
    });

    $('select#modelo').on("change", function () {
        var value = $("#modelo").val();
        CarregaVersao(value,'');      
        $("#quiAno").empty();


    });

    $('select#versao').on("change", function () {
        var value = $("#versao").val();
        CarregaQuilometragem('','');
    });


    $('#Salvar').on("change", function () {
        Salvar();
    });

    function CarregaMarca(marca) {
        $.ajax({
            url: "http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make",
            async: false,
            success: function (data) {
                $("#marca").empty();
                $("#marca").append('<option value="">Selecione ...</option>');
                $.each(data, function (i, element) {
                    if (element.Name === marca) {
                        
                        $("#marca").append('<option value=' + element.ID + ' selected>' + element.Name + '</option>');
                    } else {
                        $("#marca").append('<option value=' + element.ID + '>' + element.Name + '</option>');
                    }
                });
            }
        });
    }
   
    function CarregaModelo(idMarca,modelo) {
        if (idMarca === 0) {
            idMarca = $("#marca").val();
        }
        $.ajax({
            // url: "/Gerenciamento/Setor/Listar",
            url: "http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=" + idMarca,
            async: false,
            success: function (data) {

                $("#modelo").empty();
                $("#modelo").append('<option value="">Selecione ...</option>');
                $.each(data, function (i, element) {
                    if (element.Name === modelo) {
                        $("#modelo").append('<option value=' + element.ID + ' selected>' + element.Name + '</option>');
                    } else {
                        $("#modelo").append('<option value=' + element.ID + '>' + element.Name + '</option>');
                    }                    
                });
            }
        });

    }

    function CarregaVersao(idModelo, versao) {
        if (idModelo === 0) {
            idModelo = $("#modelo").val();
        }
        $.ajax({
            url: "http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=" + idModelo,
            async: false,
            success: function (data) {
               // console.log(idModelo);
                $("#versao").empty();
                $("#versao").append('<option value="">Selecione ...</option>');
                $.each(data, function (i, element) {
                    if (element.Name === versao) {
                        $("#versao").append('<option value=' + element.ID + ' selected>' + element.Name + '</option>');
                    } else {
                        $("#versao").append('<option value=' + element.ID + '>' + element.Name + '</option>');
                    } 
                });
            }
        });

    }

    function CarregaQuilometragem(quilometragem, ano) {

        console.log("km", quilometragem);
        console.log("ano", ano);
        
        $.ajax({
            url: "http://desafioonline.webmotors.com.br/api/OnlineChallenge/Vehicles?Page=" + $("#marca").val(),
            async: false,
            success: function (data) {

                $("#quiAno").empty();
                $("#quiAno").append('<option value="">Selecione ...</option>');

                $.each(data, function (i, element) {
                    if (element.Model === $('#modelo :selected').text()) {                        

                        if (element.KM.toString() === quilometragem.toString() && element.YearModel.toString() === ano.toString()) {
                           // console.log("aqui");
                            $("#quiAno").append('<option value=' + element.KM + ' data=' + element.YearModel + ' selected> KM:' + element.KM + ' - Ano Modelo:' + element.YearModel + '</option>');
                        } else {
                            $("#quiAno").append('<option value=' + element.KM + ' data=' + element.YearModel + '> KM:' + element.KM + ' - Ano Modelo:' + element.YearModel + '</option>');
                        }

                    }
                });
            }
        });

    }
         
    function validaDados() {

        var mensagem = "";

        if ($("#marca").val() === null || $("#marca").val() === "") {
            $("#marca").css({ "border-color": "#F00", "padding": "1px" });            
            mensagem = mensagem + "|marca|";
        } else {
            $("#marca").css({ "border-color": "blue", "padding": "1px" });          
        }

        if ($("#modelo").val() === null || $("#modelo").val() === "") {
            $("#modelo").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|modelo|";
        } else {
            $("#modelo").css({ "border-color": "blue", "padding": "1px" });
        }

        if ($("#versao").val() === null || $("#versao").val() === "") {
            $("#versao").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|versao|";
        } else {
            $("#versao").css({ "border-color": "blue", "padding": "1px" });
        }  


        if ($("#quiAno").val() === null || $("#quiAno").val() === "") {
            $("#quiAno").css({ "border-color": "#F00", "padding": "1px" });
            mensagem = mensagem + "|quiAno|";
        } else {
            $("#quiAno").css({ "border-color": "blue", "padding": "1px" });
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
            url: "/WebMotor/CarregaDados/" + id,
            success: function (data) {
                //console.log(data);
                $.each(data, function (i, element) {

                    $("#Id").val(element.Id);

                    $("#marca").val(element.Marca);
                    CarregaMarca(element.Marca);
                   
                    $("#modelo").val(element.Modelo);
                    CarregaModelo(0,element.Modelo);

                    $("#versao").val(element.Versao);
                    CarregaVersao(0, element.Versao);

                    //$("#quiAno").val(element.Quilometragem);
                    CarregaQuilometragem(element.Quilometragem,element.Ano);

                    $("#obs").val(element.Observacao);
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
        var dados = {
            marca: $("select#marca option:selected").text(),
            modelo: $("select#modelo option:selected").text(),
            versao: $("select#versao option:selected").text(),
            ano: $("select#quiAno option:selected").attr('data'),
            km: $('#quiAno').val(),
            obs: $('#obs').val()
        };

      //  console.log(dados);

        jQuery.ajax({
            type: "POST",
            url: "/WebMotor/Salvar",
            dataType: "json",
            data: {
                marca: $("select#marca option:selected").text(),
                modelo: $("select#modelo option:selected").text(),
                versao: $("select#versao option:selected").text(),
                ano: $("select#quiAno option:selected").attr('data'),
                km: $('#quiAno').val(),
                obs: $('#obs').val()
            },
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
                    window.location.assign("/WebMotor/Index");
                }, 1000);


            },
            error: function (request, status, erro) {
             //  console.log("erro");

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
            url: "/WebMotor/Editar",
            dataType: "json",
            data: {
                Id: $('#Id').val(),
                marca: $("select#marca option:selected").text(),
                modelo: $("select#modelo option:selected").text(),
                versao: $("select#versao option:selected").text(),
                ano: $("select#quiAno option:selected").attr('data'),
                km: $('#quiAno').val(),
                obs: $('#obs').val()
            },
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
                    window.location.assign("/WebMotor/Cadastro/" + id);
                }, 1000);
                //Redireciona após 5 segundos
                setTimeout(function () {
                    window.location.assign("/WebMotor/Cadastro/" + id);
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
            url: "/WebMotor/Exclusao/" + id,
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
                    window.location.assign("/WebMotor/Index");
                }, 1000);
            },
            error: function (request, status, erro) {
               // console.log("erro");

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