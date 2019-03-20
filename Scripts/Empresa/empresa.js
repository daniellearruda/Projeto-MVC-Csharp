$(document).ready(function () {
     
    $.noConflict();
    //=============================GRID ==================================
    $(function () {

        $grid = $("#jqGrid").jqGrid({
            url: '/Empresa/Listar',
            mtype: 'GET',
            datatype: 'json',
            postData: {
             
            },
            colModel: [
                { label: 'Id', name: 'Id', width: 25 },
                { label: 'UF', name: 'Uf', width: 80 },
                { label: 'Cnpj', name: 'Cnpj', width: 250 },
                { label: 'Nome Fantasia', name: 'NomeFantasia', width: 250 }              
            ],
            loadonce: true,
            pager: '#jqGridPager',
            rowNum: 10,
            rowList: [10, 20, 30, 50],
            viewrecords: true,
            height: 200
        });
        $("#jqGrid").jqGrid('navGrid', '#jqGridPager', { edit: false, add: false, del: false });
        
    });

    $("#jqGrid").dblclick(function () {
        var kwGrid = $("#jqGrid").jqGrid('getGridParam', 'selrow');
        var ret = $("#jqGrid").jqGrid('getRowData', kwGrid);
        window.location = '/Empresa/Cadastro?id=' + ret['Id'];
    });
});