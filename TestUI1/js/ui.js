
//#region Vars
var currentPage = {
    id: null,
    valid: true,
    dataName: "",
    icon: "",
    title: "",
    url: ""
};
var currentPageStore = {
    id: null,
    valid: true,
    dataName: "",
    icon: "",
    title: "",
    url: ""
};

var currentPageFromLocal; //Store current page retrieved from localstorage
//#endregion
//#region Datasources

//#endregion

//#region Nav Menu

//this backbone view is not very well... But is all I know, for now...
var SideBar = Backbone.View.extend({
    visible: false,
    
    initialize: function (options) {
        this.$el.addClass("hidden");
    },

    render: function () {
    
    },

    show: function (t) {
        switch (t) {
            case true:
                this.$el.siblings(".sideBar").addClass("hidden");
                this.$el.removeClass("hidden");
                this.visible = true;
                $(".sideBarOverlay").fadeIn();
                break;
            case false:
                this.$el.addClass("hidden");
                this.visible = false;
                $(".sideBarOverlay").fadeOut();
                break;
            default:
                if (this.isVisible()) {
                    this.show(false);
                } else {
                    this.show(true);
                }
                break;
        }
    },

    isVisible: function () {
        return !this.$el.hasClass("hidden");
    }

});
//#endregion

function buildNavigationMenu() {
    //console.info("Build Nav Menu");
    //Build Nav Menu (SideBar)
    var navMenu = new SideBar({ el: $("#navMenu") });
    //Build Nav Menu Btn Opener
    var navMenuBtn = $("#navMenuBtn");
    
    navMenuBtn.unbind("click").click(function () {
        navMenu.show(true);
    });
    $(".sideBarOverlay").click(function () {
        navMenu.show(false);
    })

    $("#navMenu .nav-btn").click(function () {
        var _t = this;
        loadPage($(_t).attr("data-page"));
        navMenu.show(false);
    });
}

function loadPage(pageToLoad) {
    try {
        
    } catch (e) {

    }
    var oldId = currentPage.id;
    
    currentPage.dataName = pageToLoad;
    
    switch (pageToLoad) {
        case "home":
            currentPage.id = 1;
            currentPage.url = "home.html";
            currentPage.title = "Inicio";
            currentPage.icon = "mdi mdi-home";
            break;

        case "students":
            currentPage.id = 2;
            currentPage.url = "students.html";
            currentPage.title = "Alumnos";
            currentPage.icon = "mdi mdi-account-multiple";
            break;
        
        default:
            currentPage.id = null;
            currentPage.valid = false;
            break;
    }

    //console.log(oldId, " - ",currentPage.id);
    if (currentPage.valid) {
        $("#main").removeClass("slideInLeft slideInRight slideInDown");
        if (oldId != null) {
            //console.log("out anim: ", oldId, currentPage.id)
            if (oldId < currentPage.id) {
                $("#main").addClass("slideOutLeft");
            } else if (oldId == currentPage.id) {
                $("#main").addClass("slideOutDown");
            } else {
                $("#main").addClass("slideOutRight");
            }
        } else {
            $("#main").addClass("invisible")
        }
        setTimeout(function () {
            $("#pageTitle > i.icon").attr("class", "icon " + currentPage.icon);
            $("#pageTitle > span.text").html(currentPage.title);
            $("#main").load(currentPage.url, function () {
                setTimeout(function () {
                    $("#main").removeClass("slideOutRight slideOutLeft slideOutDown invisible");
                    //console.log("in anim: ",oldId, currentPage.id)
                    if (oldId < currentPage.id) {
                        $("#main").addClass("slideInRight");
                    } else if (oldId == currentPage.id) {
                        $("#main").addClass("slideInDown");
                    } else {
                        $("#main").addClass("slideInLeft");
                    }
                }, 500);
            });
        }, 500);
        
    }

    if (currentPage.id != 5 && currentPage.id != 6) {
        currentPageStore.id = currentPage.id;
        currentPageStore.dataName = currentPage.dataName;
        currentPageStore.url = currentPage.url;
        currentPageStore.valid = currentPage.valid;
        currentPageStore.icon = currentPage.icon;
        currentPageStore.title = currentPage.title;
    }
}
//#endregion

function showLoading(t, container, style) {
    try {
        if (t) {
            style = style.toLowerCase()
            var loadingFrame =
            '<div class="loadingFrame '+style+'">' +
                '<div class="spinningCogs">' +
                    '<i class="left-cog fa fa-cog fa-spin"></i>' +
                    '<i class="center-cog fa fa-cog fa-spin-reverse"></i>' +
                    '<i class="right-cog fa fa-cog fa-spin"></i>' +
                '</div>' +
            '</div>';

            if (container.find(".loadingFrame").length == 0) {
                container.append(loadingFrame);
            }
            container.find(".loadingFrame").fadeIn();
        } else {
            container.find(".loadingFrame").fadeOut(function () {
                container.find(".loadingFrame").remove();
            });
        }
    } catch (e) {
        console.log(e);
    }
    

}

function resizeNavMenu() {
    $("#pagesList").css({
        bottom: $("#optionsList").outerHeight(true)
    });

}

function resizeApp() {
    resizeNavMenu();
}

$(window).resize(resizeApp);

$(document).ready(function () {
    
    if (window.mobilecheck()) {
        $("html").addClass("isMobile");
    } else {
        $("html").removeClass("isMobile");
    }

    buildNavigationMenu();
    setTimeout(function () { loadPage("home"); }, 3000);
});