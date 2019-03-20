$(document).ready(function () {
     
    $.noConflict();
    //=============================GRID ==================================
    $(function () {

        $grid = $("#jqGrid").jqGrid({
            url: '/Usuario/Listar',
            mtype: 'GET',
            datatype: 'json',
            postData: {
             
            },
            colModel: [
                { label: 'Id', name: 'Id', width: 25 },
                { label: 'Nome', name: 'Nome', width: 120 },
                { label: 'Login', name: 'Login', width: 120 }
                            
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
        window.location = '/Usuario/Cadastro?id=' + ret['Id'];
    });
});