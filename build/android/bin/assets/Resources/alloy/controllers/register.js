function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "register";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.register = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "register",
        fullscreen: "false"
    });
    $.__views.register && $.addTopLevelView($.__views.register);
    $.__views.registerLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "registerLabel"
    });
    $.__views.register.add($.__views.registerLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.register.title = L("register", "Register");
    $.registerLabel.text = L("register", "Register");
    $.register.addEventListener("open", function() {
        if ($.register.activity) {
            var activity = $.register.activity;
            if (Alloy.Globals.Android.Api >= 11 && activity.actionBar) {
                activity.actionBar.title = L("login", "Login");
                activity.actionBar.displayHomeAsUp = true;
                activity.actionBar.onHomeIconItemSelected = function() {
                    $.register.close();
                    $.register = null;
                };
            }
        }
    });
    $.register.addEventListener("android:back", function() {
        $.register.close();
        $.register = null;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;