$(document).ready(function () {
     
    $.noConflict();
    //=============================GRID ==================================
    $(function () {

        $grid = $("#jqGrid").jqGrid({
            url: '/WebMotor/Listar',
            mtype: 'GET',
            datatype: 'json',
            postData: {
             
            },
            colModel: [
                { label: 'Id', name: 'Id', width: 25 },
                { label: 'Ano', name: 'Ano', width: 40 },
                { label: 'Marca', name: 'Marca', width: 150 },
                { label: 'Modelo', name: 'Modelo', width: 150 },
                { label: 'Versão', name: 'Versao', width: 250 },
                { label: 'Quilometragem', name: 'Quilometragem', width: 150 , align:'center'} ,             
                { label: 'Observacao', name: 'Observacao', width: 250 }             
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
        window.location = '/WebMotor/Cadastro?id=' + ret['Id'];
    });
});