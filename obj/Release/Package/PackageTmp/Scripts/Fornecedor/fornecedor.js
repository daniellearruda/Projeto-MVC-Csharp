$(document).ready(function () {
     
    $.noConflict();

    jQuery(function ($) {
         $("#data").mask("99/99/9999");
    });

    //=============================GRID ==================================
    $(function () {

        $grid = $("#jqGrid").jqGrid({
            url: '/Fornecedor/Listar',
            mtype: 'GET',
            datatype: 'json',
            postData: {
               
                nome: function () { return jQuery("#nome").val(); },
                cnpj: function () { return jQuery("#cnpj").val(); },              
                data: function () { return jQuery("#data").val(); }              

            },
            colModel: [
                { label: 'Id', name: 'Id', width: 25 },
                { label: 'Nome', name: 'Nome', width: 160 },
                { label: 'Cnpj', name: 'Cpf_Cnpj', width: 80 },
                { label: 'Empresa', name: 'NomeEmpresa', width: 90 },
                { label: 'Telefone', name: 'Telefone', width: 60 },              
                { label: 'Cadastro', name: 'Data_Criacao', width: 60 },              
                { label: 'Nascimento', name: 'Data_Nascimento', width: 60 },              
                { label: 'Rg', name: 'RG', width: 60 },              
            ],
            loadonce: true,
            pager: '#jqGridPager',
            rowNum: 10,
            rowList: [10, 20, 30, 50],
            viewrecords: true,
            height: 200,
            width: 900,
        });
        $("#jqGrid").jqGrid('navGrid', '#jqGridPager', { edit: false, add: false, del: false });


    });

    $("#jqGrid").dblclick(function () {
        var kwGrid = $("#jqGrid").jqGrid('getGridParam', 'selrow');
        var ret = $("#jqGrid").jqGrid('getRowData', kwGrid);
        window.location = '/Fornecedor/Cadastro?id=' + ret['Id'];
    });

    const inputElenome = document.getElementById('nome');
    inputElenome.addEventListener('keyup', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // codigo da tecla enter
            nome = this.value;
            $("#jqGrid").setGridParam({ datatype: 'json', page: 1 }).trigger('reloadGrid');
        }

    });

    const inputElecnpj = document.getElementById('cnpj');
    inputElecnpj.addEventListener('keyup', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // codigo da tecla enter
            cnpj = this.value;
            $("#jqGrid").setGridParam({ datatype: 'json', page: 1 }).trigger('reloadGrid');
        }

    });

    const inputEledata = document.getElementById('data');
    inputEledata.addEventListener('keyup', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // codigo da tecla enter
            data = this.value;
            $("#jqGrid").setGridParam({ datatype: 'json', page: 1 }).trigger('reloadGrid');
        }

    });

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
});