function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.loginForm = Alloy.createController("login_form", {
        id: "loginForm",
        __parentSymbol: __parentSymbol
    });
    $.__views.navgroup = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.loginForm.getViewEx({
            recurse: true
        }),
        id: "navgroup"
    });
    $.__views.navgroup && $.addTopLevelView($.__views.navgroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.navgroup = $.navgroup;
    $.navgroup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;