function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId1 = [];
    $.__views.tabHome = Alloy.createController("home", {
        id: "tabHome"
    });
    __alloyId1.push($.__views.tabHome.getViewEx({
        recurse: true
    }));
    $.__views.tabList = Alloy.createController("list", {
        id: "tabList"
    });
    __alloyId1.push($.__views.tabList.getViewEx({
        recurse: true
    }));
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId1,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    Cloud.Users.showMe(function(e) {
        if (e.success) {
            $.tabGroup.open();
            $.tabGroup.setActiveTab(1);
            Alloy.Globals.tabGroup = $.tabGroup;
            $.tabGroup.addEventListener("open", function() {
                if ($.tabGroup.activity) {
                    var activity = $.tabGroup.activity;
                    Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar && (activity.actionBar.title = L("appTitle", "Demo App"));
                }
            });
            $.tabGroup.addEventListener("android:back", function() {
                var activity = Ti.Android.currentActivity;
                activity.finish();
            });
        } else Alloy.createController("login");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;