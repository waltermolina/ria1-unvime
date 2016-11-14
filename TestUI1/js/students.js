

//#region DataSources

var studentsGridDS = new kendo.data.DataSource({
    transport: {
        read: {
            url: "http://localhost/TestApi1/api/Students",
            type: "GET",
            dataType: "json",
            
            complete: function () {
                
            }
        },
        update: {
            url: function (options) {
                return "http://localhost/TestApi1/api/Students/" + options.IdStudent;
            },
            type: "PUT",
            dataType: "json",
            complete: function (jqXHR, data, status) {
                if (jqXHR.status == 204) {
                    studentsGridDS.read();
                    
                } else {
                    
                }
            }
        },
        create: {
            url: "http://localhost/TestApi1/api/Students",
            dataType: "json",
            type: "POST",
        },
        destroy: {
            url: function (options) {
                return "http://localhost/TestApi1/api/Students/" + options.IdStudent;
            },
            type: "DELETE",
            complete: function (jqXHR, data, status) {
                if (jqXHR.status == 200) {
                    studentsGridDS.read();
                    
                } else {
                    
                }
            }
        },
    },
    requestStart: function (e) {
        
    },
    requestEnd: function (e) {
        
    },
    error: function (e) {
        
    },
    schema: {
        model: {
            id: "IdStudent",
            fields: {
                IdStudent: { type: "number" },
                File: { type: "string" },
                FirstName: { type: "string" },
                LastName: { type: "string" },
                IdType: { type: "string" },
                IdNumber: { type: "string" },
                Career: { type: "number" },
                StartYear: { type: "number" }
            }
        }
    }
});

//#endregion

function buildStudentsGrid() {

    if (!$("#gridStudents").data("kendoGrid")) {
        var grid = $("#gridStudents").kendoGrid({
            //autoBind: false,
            dataSource: studentsGridDS,
            dataBound: function () {

                resizeGrid($("#gridStudents"), $("#studentsGridContainer"));

                gridVerticalScrollShadow($("#gridStudents"));

                gridHorizontalScrollShadow($("#gridStudents"));

                customizePrimaryGridHeaders($("#gridStudents"));

                $("#gridStudents > .k-grid-content-locked > table").css("padding-bottom", getScrollBarSize());

                $('#gridStudents > .k-grid-content td[role="gridcell"]').unbind("click").click(function (e) {
                    //inkFX(e, $(e.target), $(e.target).closest("td"))
                })

            },
            editable: "inline",
            columnMenu: true,
            filterable: true,
            sortable: true,
            reorderable: true,
            //selectable: 'cell',
            resizable: true,
            groupable: true,
            pageable: false,
            toolbar: ["create"],
            columns: [
                {
                    field: "File",
                    title: "Legajo",
                    groupable: false,
                    filterable: true
                },
                {
                    field: "LastName",
                    title: "Apellido",
                    groupable: true,
                    filterable: true
                },
                {
                    field: "FirstName",
                    title: "Nombre",
                    groupable: true,
                    filterable: true
                },
                {
                    field: "IdNumber",
                    title: "ID",
                    groupable: false,
                    filterable: true
                },
                {
                    field: "Career",
                    title: "Carrera",
                    groupable: true,
                    filterable: true
                },
                {
                    field: "StartYear",
                    title: "Año de Inicio",
                    groupable: true,
                    filterable: true
                },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }
            ],
            mobile: false,
            change: function (e) {
            }
        });
        
    } else {
        $("#gridstudents").data("kendoGrid").dataSource.data([]);
        //$("#gridstudents").data("kendoGrid").refresh();
    }
}

function resizeDetailsViewKPI() {
    if ($("#DetailsViewKPIPopUpWindow").is(':visible')) {
        var hResize = $("#iStability > #main").height();
        $("#DetailsViewKPIPopUpWindow").data("kendoWindow").setOptions({
            height: hResize / 2,
            position: {
                top: "50%"
            }
        });
        setTimeout(function () {
            if ($("#trendChart").is(':visible') && $("#trendChart").data("kendoChart")) {
                $("#trendChart").data("kendoChart").refresh();
            }
        }, 500);
    }

}

function startStudents() {
    
    buildStudentsGrid();
    resizeStudents();
}

function resizeStudents() {
    
    if ($("#studentsPage")) {
        resizeGrid($("#gridStudents"), $("#studentsGridContainer"));
    }

    var toolbarW = $("#studentsGridFilters .filterList").width();

    if (toolbarW > 768) {
        toolbarW = 768;
    }

}

$(window).resize(resizeStudents);


$(document).ready(function () {
    startStudents();
});