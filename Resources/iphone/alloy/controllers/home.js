function Controller() {
    function createRow(image, title, i) {
        var tableRow = Ti.UI.createTableViewRow({
            dataId: i,
            className: "row",
            objName: "row"
        });
        var iv = Ti.UI.createImageView({
            image: image
        });
        tableRow.add(iv);
        var label = Ti.UI.createLabel({
            top: "80",
            text: title
        });
        tableRow.add(label);
        return tableRow;
    }
    function actionLogout() {
        var Cloud = require("ti.cloud");
        Cloud.Users.logout(function(e) {
            if (e.success) {
                var loginController = Alloy.createController("login");
                loginController.getView().open();
                Alloy.Globals.tabGroup.close();
                Alloy.Globals.tabGroup = null;
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function homeTableClick(e) {
        var dataId = e.rowData.dataId;
        var nextController;
        if (1 == dataId) {
            nextController = Alloy.createController("lecture_summary");
            $.tabHome.open(nextController.getView());
        } else 2 == dataId || 3 == dataId || 4 == dataId;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.home = Ti.UI.createWindow({
        backgroundImage: "images/eSchool.jpg",
        id: "home"
    });
    $.__views.__alloyId1 = Ti.UI.createView({
        id: "__alloyId1"
    });
    $.__views.home.add($.__views.__alloyId1);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "activityIndicator"
    });
    $.__views.__alloyId1.add($.__views.activityIndicator);
    $.__views.labelHome = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        top: 0,
        id: "labelHome"
    });
    $.__views.__alloyId1.add($.__views.labelHome);
    $.__views.tableHome = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        top: "10%",
        width: "40%",
        left: "5%",
        scrollable: false,
        backgroundColor: "transparent",
        id: "tableHome"
    });
    $.__views.__alloyId1.add($.__views.tableHome);
    $.__views.tableHome2 = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        top: "10%",
        width: "40%",
        left: "55%",
        scrollable: false,
        backgroundColor: "transparent",
        id: "tableHome2"
    });
    $.__views.__alloyId1.add($.__views.tableHome2);
    $.__views.tabHome = Ti.UI.createTab(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            icon: "images/53-house.png"
        });
        _.extend(o, {
            window: $.__views.home,
            id: "tabHome"
        });
        return o;
    }());
    $.__views.tabHome && $.addTopLevelView($.__views.tabHome);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabHome.title = L("home", "Home");
    $.home.title = L("home", "Home");
    $.labelHome.text = L("labelHome", "Welcome Test User!");
    Ti.App.addEventListener("homeUpdated", function() {
        if (!_.isEmpty($.tableHome.data)) {
            $.tableHome.data = [];
            $.tableHome.removeEventListener("click", homeTableClick);
        }
        $.activityIndicator.show();
        var recordData = [];
        var recordData2 = [];
        recordData.push(createRow("/images/appicon.png", "Lecture Summary", 1));
        recordData.push(createRow("/images/appicon.png", "Students Scorecard", 2));
        recordData2.push(createRow("/images/appicon.png", "Teacher's Feedback", 3));
        recordData2.push(createRow("/images/appicon.png", "Schools Events", 4));
        $.tableHome.setData(recordData);
        $.tableHome2.setData(recordData2);
        $.tableHome.addEventListener("click", homeTableClick);
        var table_bottom = "-1dp";
        var tableAnimation = Ti.UI.createAnimation({
            bottom: table_bottom,
            duration: 100
        });
        tableAnimation.addEventListener("complete", function() {
            var table_bottom = "50dp";
            "android" === osname && (table_bottom = "0dp");
            $.tableHome.animate({
                bottom: table_bottom,
                duration: 100
            });
            $.tableHome2.animate({
                bottom: table_bottom,
                duration: 100
            });
        });
        $.activityIndicator.hide();
    });
    Ti.App.fireEvent("homeUpdated");
    var btnRightNav = Ti.UI.createButton({
        title: L("logout", "Logout")
    });
    btnRightNav.addEventListener("click", actionLogout);
    $.home.rightNavButton = btnRightNav;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;