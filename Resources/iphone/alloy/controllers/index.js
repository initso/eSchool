function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId2 = [];
    $.__views.tabHome = Alloy.createController("home", {
        id: "tabHome"
    });
    __alloyId2.push($.__views.tabHome.getViewEx({
        recurse: true
    }));
    $.__views.tabList = Alloy.createController("list", {
        id: "tabList"
    });
    __alloyId2.push($.__views.tabList.getViewEx({
        recurse: true
    }));
    $.__views.tabEvents = Alloy.createController("events", {
        id: "tabEvents"
    });
    __alloyId2.push($.__views.tabEvents.getViewEx({
        recurse: true
    }));
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId2,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    Cloud.Users.showMe(function(e) {
        if (e.success) {
            $.tabGroup.open();
            $.tabGroup.setActiveTab(0);
            Alloy.Globals.tabGroup = $.tabGroup;
        } else Alloy.createController("login");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;