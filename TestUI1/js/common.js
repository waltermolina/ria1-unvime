
function emptyizer(v) {
    return (v == null || v == "null") ? '' : v;
}

function getScrollBarSize() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;

    if (w1 == w2) {
        w2 = outer.clientWidth;
    }

    document.body.removeChild(outer);

    return (w1 - w2);
}

function resizeColumnByGallego(grid) {

    if ($(document).width() > 695) {
        var contain = grid.width();
        var locked = grid.children(".k-grid-content-locked").width();

        var same = contain - locked;
        console.log("funcion resize gallego", same);
        grid.find(".k-grid-content").css("width", same + 'px');
        grid.find(".k-grid-content > table").css("width", same + 'px');
        grid.find(".k-grid-header-wrap").css("width", same + 'px');
        grid.find(".k-grid-header-wrap > table").css("width", same + 'px');
    } else {
        var detailsGrid = grid.data("kendoGrid");
        $.each(detailsGrid.columns, function (i, v) {
            if (v.locked == undefined) {
                detailsGrid.autoFitColumn(i);
            } else {

            }
        });
    }
}

function resizeColumns(grid) {

    var valueField = { field: "", title: "", template: "" };

    switch (getValueFilter()) {
        case "PR":
            valueField.field = "PR";
            valueField.title = "PR";
            valueField.template = barTemplate;
            break;
        case "UpDt":
            valueField.field = "UpDt";
            valueField.title = "UP EffLoss";
            valueField.template = barTemplate;
            break;
        case "TotalStops":
            valueField.field = "TotalStops";
            valueField.title = "Unplanned Stops";
            valueField.template = barTemplate;
            break;
    }

    if (valueField.field == "PR") {
        var detailsGrid = grid.data("kendoGrid");
        $.each(detailsGrid.columns, function (i, v) {
            if (v.locked == undefined) {
                detailsGrid.autoFitColumn(i);
            } else {

            }
        });
    } else {
        if ($(document).width() > 695) {
            var contain = grid.width();
            var locked = grid.children(".k-grid-content-locked").width();

            var same = contain - locked;
            console.log("funcion resize gallego", same);
            grid.find(".k-grid-content").css("width", same + 'px');
            grid.find(".k-grid-content > table").css("width", same + 'px');
            grid.find(".k-grid-header-wrap").css("width", same + 'px');
            grid.find(".k-grid-header-wrap > table").css("width", same + 'px');
        } else {
            var detailsGrid = grid.data("kendoGrid");
            $.each(detailsGrid.columns, function (i, v) {
                if (v.locked == undefined) {
                    detailsGrid.autoFitColumn(i);
                } else {

                }
            });
        }
    }
}

//Auto Resize for Kendo Grids
//  grid --> $("#gridName")
//  container --> $("#containerName") container that supports grid, needed to know the max height/width
function resizeGrid(grid, container) {
    try {
        if (grid.length) {
            var contentHeight = container.height();
            grid.css("height", contentHeight + 'px');

            //console.log("contentHeight: ", contentHeight);

            var additionalToolbarsHeight = 0;
            container.children('.grid-toolbar').each(function (index) {
                additionalToolbarsHeight += $(this).outerHeight(true);
            });

            grid.css("height", contentHeight - additionalToolbarsHeight + 'px');

            var gridToolbarHeight = grid.find('.k-grid-toolbar').outerHeight(true);
            console.log("gridToolbarHeight: ", gridToolbarHeight);

            var gridGroupHeaderHeight = grid.find('.k-grouping-header').outerHeight(true);
            console.log("gridGroupHeaderHeight: ", gridGroupHeaderHeight);

            var gridPagerHeight = grid.find('.k-grid-pager').outerHeight(true);
            console.log("gridPagerHeight: ", gridPagerHeight);

            var gridHeaderHeight = grid.find('.k-grid-header').outerHeight(true);
            console.log("gridHeaderHeight: ", gridHeaderHeight);

            var gridFooterHeight = grid.find('.k-grid-footer').outerHeight(true);
            console.log("gridHeaderHeight: ", gridFooterHeight);

            var tableContentHeight = contentHeight - (gridPagerHeight + gridHeaderHeight + gridFooterHeight + gridToolbarHeight + gridGroupHeaderHeight + additionalToolbarsHeight);
            console.log("tableContentHeight: ", tableContentHeight);

            var kContent = grid.children();
            kContent = kContent.filter(function () {
                return this.className.match(/\bk-grid-content/);
            });
            $.each(kContent, function (i, v) {
                $(v).css("height", tableContentHeight + 'px');
            });

            var contentLockedWidth = grid.children(".k-grid-content-locked").width();
            var contentLockedHasScrollH = grid.children('.k-grid-content').get(0).scrollWidth > grid.children('.k-grid-content').get(0).clientWidth;

            var kGridHorScrollShadowBottom = (contentLockedHasScrollH ?
                                                (!isNaN(parseFloat(window.scrollbarHeight)) ?
                                                    parseFloat(window.scrollbarHeight)
                                                    : 0)
                                                : 0);

            grid.children(".k-grid-hor-scroll-shadow").css({
                "top": gridToolbarHeight + gridGroupHeaderHeight,
                "bottom": (gridPagerHeight + kGridHorScrollShadowBottom),
                "left": contentLockedWidth
            });

            var customGridToolbarW = 0;
            if ($(".customGridToolbar").length > 0) {
                customGridToolbarW = $(".customGridToolbar")[0].getBoundingClientRect().width //This obtains the decimal part of the value
            }
            var groupingHeaderPaddingH = parseFloat(grid.children(".k-grouping-header.with-customToolbar").css("padding-left")) + parseFloat(grid.children(".k-grouping-header.with-customToolbar").css("padding-right"));
            grid.children(".k-grouping-header.with-customToolbar").width(grid.width() - customGridToolbarW - groupingHeaderPaddingH - 1);

            grid.find(".k-grid-header").css({
                "padding-right": window.scrollBarSize
            });
        }
    } catch (e) {
        console.error("CATCH ", e);
    }
}

//Auto Resize for Kendo Sub-Grids (Only second level grids)
//  sg --> $("#subGridElement")
//  height --> number, the desired height of the sub-grid
function resizeSubGrid(sg, height) {
    var contentHeight = height;
    $(sg).css("height", contentHeight + 'px');

    //console.log("contentHeight: ", contentHeight);

    var gridToolbarHeight = $(sg).children('.k-grid-toolbar').outerHeight(true);
    //console.log("gridToolbarHeight: ", gridToolbarHeight);

    var gridGroupHeaderHeight = $(sg).children('.k-grouping-header').outerHeight(true);
    //console.log("gridGroupHeaderHeight: ", gridGroupHeaderHeight);

    var gridPagerHeight = $(sg).children('.k-grid-pager').outerHeight(true);
    //console.log("gridPagerHeight: ", gridPagerHeight);

    var gridHeaderHeight = $(sg).children('.k-grid-header').outerHeight(true);
    //console.log("gridHeaderHeight: ", gridHeaderHeight);

    var tableContentHeight = contentHeight - (gridPagerHeight + gridHeaderHeight + gridToolbarHeight + gridGroupHeaderHeight);
    //console.log("tableContentHeight: ", tableContentHeight);

    $(sg).children('.k-grid-content').css("height", tableContentHeight + 'px');
}

//Scroll Shadow for Kendo Grids
//  grid --> $("#gridName")
function gridVerticalScrollShadow(grid) {
    if (grid.length) {
        grid.children(".k-grid-content").scroll(function () {

            //VERTICAL SCROLL
            if (grid.children(".k-grid-content").scrollTop() >= 1) {
                grid.children(".k-grid-header").addClass("scrollShadow");
            } else {
                grid.children(".k-grid-header").removeClass("scrollShadow");
            }
        });
    }

}

function gridHorizontalScrollShadow(grid) {
    if (grid.length) {
        if (grid.children(".k-grid-hor-scroll-shadow").length == 0) {
            grid.append('<div class="k-grid-hor-scroll-shadow"></div>');
            grid.children(".k-grid-hor-scroll-shadow").hide();
        }

        grid.children(".k-grid-content").scroll(function () {
            //HORIZONTAL SCROLL
            if (grid.children(".k-grid-content").scrollLeft() >= 1) {
                grid.children(".k-grid-hor-scroll-shadow").fadeIn();
            } else {
                grid.children(".k-grid-hor-scroll-shadow").fadeOut();
            }
        });
    }

}

function customizePrimaryGridHeaders(grid) {
    //Customize sort icon and add tooltip
    $.each(grid.find(".k-grid-header > .k-grid-header-wrap > table > thead > tr th[role='columnheader']"),
        function (index, value) {
            var klink = $(this).children('a.k-link');
            klink.attr("title", klink.text());

            columnmenu = $(this).children('a.k-header-column-menu');
            columnmenu.html('<i class="fa fa-bars">');
        });
    $.each(grid.find(".k-grid-header > .k-grid-header-locked > table > thead > tr th[role='columnheader']"),
        function (index, value) {
            var klink = $(this).children('a.k-link');
            klink.attr("title", klink.text());

            columnmenu = $(this).children('a.k-header-column-menu');
            columnmenu.html('<i class="fa fa-bars">');
        });
}

//#region PR Template
function barTemplate(dataItem) {
    var color;
    var valToUse;
    var elemToShow;
    switch (filters.get("value").get("val")) {
        case "PR":
            var pr = undefined;
            if (dataItem.pr != undefined) {
                pr = dataItem.pr;
            } else if (dataItem.PR != undefined) {
                pr = dataItem.PR;
            }

            valToUse = parseFloat(pr).toFixed(2);

            if (valToUse <= 85) {
                color = "bg-pg-newred text-black";
            } else if (valToUse > 100) {
                color = "bg-pg-naturalgray text-black";
            } else {
                color = "bg-pg-darkgreen text-black";
            }
            animateValueWidth(dataItem);
            elemToShow = '<div class="animated bar-value ' + color + '">' + valToUse + '</div>';

            break;

        case "UpDt":
            color = "bg-pg-mediumblue text-black";
            valToUse = kendo.toString(dataItem.UpDtPerc, "p2"); //kendo.toString(dataItem.UpDt, "N2");
            //valToUse = kendo.toString(dataItem.UpDtPRLossPerc, "p2");
            //elemToShow = '<div class="updt-value" data-uidw="'+dataItem.uid+'-w">' + 0 + '</div>';

            animateValueWidth(dataItem);
            elemToShow = '<div class="animated bar-value ' + color + '">' + valToUse + '</div>';

            //setTimeout(function () {
            //    animateValue($(".updt-value[data-uidw='" + dataItem.uid + "-w']"), 0, parseFloat(dataItem.UpDt).toFixed(2), 2000);
            //}, 500);

            break;

        case "TotalStops":
            color = "bg-pg-mediumblue text-white";
            valToUse = kendo.toString(dataItem.TotalStops, "N2");
            elemToShow = '<div class="totalStops-value" data-uidw="' + dataItem.uid + '-w">' + 0 + '</div>';
            setTimeout(function () {
                animateValue($(".totalStops-value[data-uidw='" + dataItem.uid + "-w']"), 0, parseInt(dataItem.TotalStops), 2000);
            }, 500);
            break;
    }

    return elemToShow;

}

window.mobilecheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function friendlyPath(dataItem) {
    console.log(dataItem);
    var _path = '<span class="friendlyPath">';

    if (dataItem.type == "Total" || dataItem.type == "") {
        _path += '<span class="friendlyRootNode">' + 'Total (Root)' + '</span>';
    } else {

        if (emptyizer(dataItem.gbu) != "") {
            _path += '<span>' + dataItem.gbu + '</span>';
        }
        if (emptyizer(dataItem.initiative) != "") {
            _path += '<i class="fa fa-angle-right"></i><span>' + dataItem.initiative + '</span>';
        }
        if (filters.get("group").get("val") == "Platform") {
            if (emptyizer(dataItem.platform) != "") {
                _path += '<i class="fa fa-angle-right"></i><span>' + dataItem.platform + '</span>';
            }
            if (emptyizer(dataItem.region) != "") {
                _path += '<i class="fa fa-angle-right"></i><span>' + dataItem.region + '</span>';
            }
            if (emptyizer(dataItem.site) != "") {
                _path += '<i class="fa fa-angle-right"></i><span>' + dataItem.site + '</span>';
            }

        } else {
            if (emptyizer(dataItem.region) != "") {
                _path += '<i class="fa fa-angle-right"></i><span>' + dataItem.region + '</span>';
            }
            if (emptyizer(dataItem.site) != "") {
                _path += '<i class="fa fa-angle-right"></i><span>' + dataItem.site + '</span>';
            }
            if (emptyizer(dataItem.platform) != "") {
                _path += '<i class="fa fa-angle-right"></i><span>' + dataItem.platform + '</span>';
            }

        }

        if (emptyizer(dataItem.line) != "") {
            _path += '<i class="fa fa-angle-right"></i><span>' + dataItem.line + '</span>';
        }

    }
    _path += '</span>';

    return _path;
}

//To labels charts, reduce the number of date that shows, by gallego.
function stepLabels() {
    if (filters.get("daterange").get("code") == "30Days") {
        return 2;
    } else if (filters.get("daterange").get("code") == "PreviousMonth") {
        return 5;
    } else if (filters.get("daterange").get("code") == "Past3Months") {
        return 7;
    } else if (filters.get("daterange").get("code") == "userDefined") {
        var startLabel = filters.get("daterange").get("start");
        var endLabel = filters.get("daterange").get("end");
        var timeDiff = endLabel.getTime() - startLabel.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays >= 8) {
            return diffDays / 8;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

function calculateDetailsWindowPosition() {
    var windowHeight = $("#iStability").height();
    var topBarHeight = $("#topBar").height() / 2;
    var resultWindowHeight = windowHeight / 2;
    var heightDetails;
    if ($("#iStability").hasClass("filtersBarOpen") == true) {
        var barHeight = $("#filtersMenuBar").height();
        heightDetails = barHeight + resultWindowHeight + "px";
    } else {
        heightDetails = resultWindowHeight + topBarHeight + "px";
    }

    return heightDetails;
}
