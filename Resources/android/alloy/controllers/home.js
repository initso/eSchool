function Controller() {
    function actionLogout() {
        var Cloud = require("ti.cloud");
        Cloud.Users.logout(function(e) {
            if (e.success) {
                var activity = Ti.Android.currentActivity;
                activity.finish();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.home = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "home"
    });
    $.__views.__alloyId0 = Ti.UI.createView({
        backgroundColor: "white",
        id: "__alloyId0"
    });
    $.__views.home.add($.__views.__alloyId0);
    $.__views.labelHome = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "labelHome"
    });
    $.__views.__alloyId0.add($.__views.labelHome);
    $.__views.tabHome = Ti.UI.createTab({
        window: $.__views.home,
        id: "tabHome"
    });
    $.__views.tabHome && $.addTopLevelView($.__views.tabHome);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabHome.title = L("home", "Home");
    $.home.title = L("home", "Home");
    $.labelHome.text = L("labelHome", "Welcome Test User!");
    $.home.addEventListener("focus", function() {
        if (Alloy.Globals.tabGroup.activity) {
            var activity = Alloy.Globals.tabGroup.activity;
            activity.invalidateOptionsMenu();
            activity.onCreateOptionsMenu = function(e) {
                var menu = e.menu;
                var menuItem1 = menu.add({
                    title: L("logout", "Logout"),
                    showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER
                });
                menuItem1.addEventListener("click", actionLogout);
            };
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;