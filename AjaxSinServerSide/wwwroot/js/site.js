//// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
//// for details on configuring this project to bundle and minify static web assets.

//// Write your JavaScript code.
//$(document).ready(function () {
//    //alert('Tipo de usuario eliminado con exito');
//    $('#MyTable').DataTable({
//        //"scrollY":        "55vh", //para poner scroll lateral
//        //"scrollCollapse": true,
//        "editable": true,
//        "paging": true,
//        'lengthChange': true,
//        'searching': true,
//        'ordering': true,
//        'info': true,
//        'autoWidth': false,
//        "lengthMenu": [[10, 15, 20], [10, 15, 20]],

//        "language": {
//            processing: "Procesando datos...",
//            search: "Buscar&nbsp;",
//            lengthMenu: "Mostrar &nbsp; _MENU_ &nbsp; registros",
//            info: "Mostrando registros desde &nbsp; _START_ a _END_ hasta  _TOTAL_ registros",
//            infoEmpty: "No hay datos",
//            infoFiltered: "(Filtrando  _MAX_ registros del total)",
//            infoPostFix: "",
//            loadingRecords: "Cargando registros...",
//            zeroRecords: "No se encontraron datos",
//            emptyTable: "La tabla se encuentra vacia",
//            paginate: {
//                first: "Primero",
//                previous: "Anterior",
//                next: "Siguiente",
//                last: "Ultimo"
//            },
//            aria: {
//                sortAscending: ": activar para ver los registros en modo ascendente",
//                sortDescending: ": activar para ver los registros en modo descendente"
//            }
//        }
//    })
////});


//showInPopup = (url, title) => {
//    $.ajax({
//        type: 'GET',
//        url: url,
//        success: function (res) {
//            $('#form-modal .modal-body').html(res);
//            $('#form-modal .modal-title').html(title);
//            $('#form-modal').modal('show');
//        }
//    })
//}

//jQueryAjaxPost = form => {
//    try {
//        $.ajax({
//            type: 'POST',
//            url: form.action,
//            data: new FormData(form),
//            contentType: false,
//            processData: false,
//            success: function (res) {
//                if (res.isValid) {
//                    $('#view-all').html(res.html)
//                    $('#form-modal .modal-body').html('');
//                    $('#form-modal .modal-title').html('');
//                    $('#form-modal').modal('hide');
//                    location.reload();
//                }
//                else
//                    $('#form-modal .modal-body').html(res.html);
//            },
//            error: function (err) {
//                console.log(err)
//            }
//        })
//        //to prevent default form submit event
//        return false;
//    } catch (ex) {
//        console.log(ex)
//    }
//}

//jQueryAjaxDelete = form => {
//    if (confirm('Are you sure to delete this record ?')) {
//        try {
//            $.ajax({
//                type: 'POST',
//                url: form.action,
//                data: new FormData(form),
//                contentType: false,
//                processData: false,
//                success: function (res) {
//                    $('#view-all').html(res.html);
//                },
//                error: function (err) {
//                    console.log(err)
//                }
//            })
//        } catch (ex) {
//            console.log(ex)
//        }
//    }

//    //prevent default form submit event
//    return false;
//}
$(document).ready(function () {
    fnLoadDataTableInstance()
})
   function fnLoadDataTableInstance() {    
       var dataSource = [
           {id: '101', name: 'Gowtham', age: 28, city: 'Coimbatore', state: 'Tamil Nadu' },
           {id: '102', name: 'Sudhan', age: 38, city: 'Ooty', state: 'Tamil Nadu' },
           {id: '103', name: 'Vignesh', age: 34, city: 'Erode', state: 'Tamil Nadu' },
           {id: '104', name: 'CSK', age: 34, city: 'Coimbatore', state: 'Tamil Nadu' },
           {id: '105', name: 'Arvind', age: 28, city: 'Coimbatore', state: 'Tamil Nadu' },
           {id: '106', name: 'Rahul', age: 38, city: 'Ooty', state: 'Tamil Nadu' },
           {id: '107', name: 'Raji', age: 34, city: 'Erode', state: 'Tamil Nadu' },
           {id: '108', name: 'Ananthi', age: 34, city: 'Coimbatore', state: 'Tamil Nadu' },
]
   
$('#dtExample').DataTable({
    dom: 'Bfrtip',
    data: dataSource,
    columns: [
               {
                render: function (data, type, row, meta) {    
                               return meta.row + meta.settings._iDisplayStart + 1;
                }
        },
        {data: 'name', class: 'editable text' },
        { data: 'age', class: 'editable text' },
        { data: 'city', class: 'editable text' },
        { data: 'state', class: 'editable text' },
        {
            //edit button creation    
            render: function (data, type, row) {
                return createButton('edit', row.id);
            }
        },
        {
            //delete button creation    
            render: function (data, type, row) {
                return createButton('delete', row.id);
            }
        } 
],
"searching": false,
"paging": true,
"info": true,
"language": {
    "emptyTable": "No data available"
},
"fnRowCallback": function (nRow, aData, iDisplayIndex) {
    $("td:first", nRow).html(iDisplayIndex + 1);
    return nRow;
},
})
}

function createButton(buttonType, rowID) {
    var buttonText = buttonType == "edit" ? "Edit" : "Delete";
    return '<button class="' + buttonType + '" type="button">' + buttonText + '</button>';
} 




$('#dtExample').on('click', 'tbody td .edit', function (e) {
    fnResetControls();
    var dataTable = $('#dtExample').DataTable();
    var clickedRow = $($(this).closest('td')).closest('tr');
    $(clickedRow).find('td').each(function () {
        // do your cool stuff    
        if ($(this).hasClass('editable')) {
            if ($(this).hasClass('text')) {
                var html = fnCreateTextBox($(this).html(), 'name');
                $(this).html($(html))
            }
            
        }

    });


    $('#dtExample tbody tr td .update').removeClass('update').addClass('edit').html('Edit');
    $('#dtExample tbody tr td .cancel').removeClass('cancel').addClass('delete').html('Delete');
    $(clickedRow).find('td .edit').removeClass('edit').addClass('update').html('Update');
    $(clickedRow).find('td .delete').removeClass('delete').addClass('cancel').html('Cancel');

});

function fnCreateTextBox(value, fieldprop) {
    return '<input data-field="' + fieldprop + '" type="text" value="' + value + '" ></input>';
}   





$('#dtExample').on('click', 'tbody td .cancel', function (e) {
    fnResetControls();
    $('#dtExample tbody tr td .update').removeClass('update').addClass('edit').html('Edit');
    $('#dtExample tbody tr td .cancel').removeClass('cancel').addClass('delete').html('Delete');
});


function fnResetControls() {
    var openedTextBox = $('#dtExample').find('input');
    $.each(openedTextBox, function (k, $cell) {
        $(openedTextBox[k]).closest('td').html($cell.value);
    })
} 



$('#dtExample').on('click', 'tbody td .update', function (e) {

    var openedTextBox = $('#dtExample').find('input');
    $.each(openedTextBox, function (k, $cell) {
        fnUpdateDataTableValue($cell, $cell.value);
        $(openedTextBox[k]).closest('td').html($cell.value);
    })

    $('#dtExample tbody tr td .update').removeClass('update').addClass('edit').html('Edit');
    $('#dtExample tbody tr td .cancel').removeClass('cancel').addClass('delete').html('Delete');
});

function fnUpdateDataTableValue($inputCell, value) {
    var dataTable = $('#dtExample').DataTable();
    var rowIndex = dataTable.row($($inputCell).closest('tr')).index();
    var fieldName = $($inputCell).attr('data-field');
    dataTable.rows().data()[rowIndex][fieldName] = value;
} 

 



