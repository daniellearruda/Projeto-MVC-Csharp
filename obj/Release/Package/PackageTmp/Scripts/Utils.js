/// <reference path="../bootstrap.min.js" />
function maiuscula(z) {
    v = z.value.toUpperCase();
    z.value = v;
}
//Permite Ponto
function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    }
}

//Permite virgula
function somenteNumeros2(num) {
    var er = /[^0-9,]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    }
}

function VerificaPermissao(recurso) {
     $.ajax({
        url: "/Home/VerificaPermissao",
        data: { recurso: recurso },
        async: false,
        success: function (data) {
            $.each(data, function (i, element) {

                if (element.alterar === true) {
                    $("#Alterar").prop("disabled", false);
                } else {
                    $("#Alterar").prop("disabled", true);
                }

                if (element.excluir === true) {
                    $("#Excluir").prop("disabled", false);
                } else {
                    $("#Excluir").prop("disabled", true);
                }

                if (element.incluir === true) {
                    $("#ValidaCadastro").prop("disabled", false);
                } else {
                    $("#ValidaCadastro").prop("disabled", true);
                    $("#Novo").prop("disabled", true);                    
                }
                //novo botão relatorio
                if (element.incluir === true) {
                    $("#relatorio").prop("disabled", false);
                } else {
                    $("#relatorio").prop("disabled", true);                   
                }
            });
        }
    });
}

function VerificaPermissaoBotao(recurso,botao) {
     $.ajax({
        url: "/Home/VerificaPermissao",
        data: { recurso: recurso },
        async: false,
        success: function (data) {
            $.each(data, function (i, element) {
                
              if (element.alterar === true) {
                    $("#Alterar").prop("disabled", false);
                } else {
                    $("#Alterar").prop("disabled", true);
                }
               

            });
        }
    });
}

function CarregaMunicipio(SiglaEstado, idSelect, municipioDescricao) {
             $.ajax({
                url: "/Representantes/RepresentanteCadastroCliente/CarregaMunicipio",
                data: { id: SiglaEstado },
                async: false,
                success: function (data) {
            
                    $("#municipio" + idSelect + "").empty();                   

                    $.each(data, function (i, element) {
                        if(municipioDescricao === element.CC2_MUN){
                                   // console.log('entrou');
                                 $("#municipio" + idSelect + "").append('<option  value=' + element.CC2_CODMUN + ' selected >' + element.CC2_MUN + '</option>');
                            }else{
                                 $("#municipio" + idSelect + "").append('<option value=' + element.CC2_CODMUN + '>' + element.CC2_MUN + '</option>');
                        }
                    });

                }
            });
}

function validaEmail(email) {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(email);
}

function HabilitaForm() {
    $("input").prop("disabled", false);
    $("select").prop("disabled", false);
}

function DesabilitaForm() {
    $("input").prop("disabled", true);
    $("select").prop("disabled", true);
    $("textarea").prop("disabled", true);
}

/* Função para retornar os valores com "máscara" */
function CurrencyFormat(value) {
    return new Number(value).toLocaleString("ptb", {
        style: "currency",
        currency: "BRL"
    })
}

function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') return false;

    if (cnpj.length !== 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === "00000000000000" ||
        cnpj === "11111111111111" ||
        cnpj === "22222222222222" ||
        cnpj === "33333333333333" ||
        cnpj === "44444444444444" ||
        cnpj === "55555555555555" ||
        cnpj === "66666666666666" ||
        cnpj === "77777777777777" ||
        cnpj === "88888888888888" ||
        cnpj === "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== digitos.charAt(1))
        return false;

    return true;

}

//function validaIE(ie, estado) {
//    var retorno = false;

//        $.ajax({
//            //url: "/Representantes/RepresentanteCadastro/ValidaIE",
//            url: "/Representantes/RepresentanteCadastroCliente/ValidaIE",
//            async: false,
//            data: { cInsc: ie, cUF: estado },
//            success: function (data) {
//                if (data == 1) {//invalido
//                    retorno = false;
//                } else { //0 - valido
//                    retorno = true;
//                }
//            }
//    });
//        return retorno;
//    }

function fIsDate(data) {
    if (data.length === 10) {
        er = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
        //er = /(0[0-9]|[12][0-9]|3[01])[-\.\/](0[0-9]|1[012])[-\.\/][0-9]{4}/;
        if (er.exec(data)) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }
}