function Controller() {
    function actionLogin() {
        if ($.inputUsername.value && $.inputPassword.value) {
            $.activityIndicator.show();
            $.buttonLogin.enabled = false;
            var AppData = require("data");
            var Cloud = require("ti.cloud");
            Cloud.Users.login({
                login: $.inputUsername.value,
                password: $.inputPassword.value
            }, function(e) {
                $.activityIndicator.hide();
                $.buttonLogin.enabled = true;
                if (e.success) {
                    var user = e.users[0];
                    AppData.userName = user.username;
                    AppData.userType = user.custom_fields.type;
                    Alloy.createController("index");
                    Ti.App.fireEvent("dataUpdated");
                    $.loginForm.close();
                    $.loginForm = null;
                } else {
                    $.inputPassword.value = "";
                    alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                }
            });
        } else Ti.UI.createAlertDialog({
            message: L("formMissingFields", "Please complete all form fields"),
            ok: "OK",
            title: L("actionRequired", "Action Required")
        }).show();
    }
    function openRegister() {
        var registerController = Alloy.createController("register").getView();
        registerController.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login_form";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loginForm = Ti.UI.createWindow({
        backgroundImage: "images/eSchool.jpg",
        id: "loginForm",
        fullscreen: "false"
    });
    $.__views.loginForm && $.addTopLevelView($.__views.loginForm);
    $.__views.loginView = Ti.UI.createView({
        width: "80%",
        height: "40%",
        top: "20%",
        backgroundColor: "#FFFFFF",
        id: "loginView",
        layout: "vertical"
    });
    $.__views.loginForm.add($.__views.loginView);
    $.__views.inputUsername = Ti.UI.createTextField({
        width: 200,
        top: 10,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "inputUsername"
    });
    $.__views.loginView.add($.__views.inputUsername);
    $.__views.inputPassword = Ti.UI.createTextField({
        width: 200,
        top: 10,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "inputPassword",
        passwordMask: "true"
    });
    $.__views.loginView.add($.__views.inputPassword);
    $.__views.buttonLogin = Ti.UI.createButton({
        top: 10,
        id: "buttonLogin"
    });
    $.__views.loginView.add($.__views.buttonLogin);
    actionLogin ? $.__views.buttonLogin.addEventListener("click", actionLogin) : __defers["$.__views.buttonLogin!click!actionLogin"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        id: "activityIndicator"
    });
    $.__views.loginView.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.loginForm.title = L("login", "Login");
    $.inputUsername.hintText = L("username", "Username");
    $.inputPassword.hintText = L("password", "Password");
    $.buttonLogin.title = L("login", "Login");
    $.loginForm.addEventListener("open", function() {
        if ($.loginForm.activity) {
            var activity = $.loginForm.activity;
            activity.invalidateOptionsMenu();
            activity.onCreateOptionsMenu = function(e) {
                var menu = e.menu;
                var menuItem1 = menu.add({
                    title: L("register", "Register"),
                    showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER
                });
                menuItem1.addEventListener("click", openRegister);
            };
            Alloy.Globals.Android.Api >= 11 && activity.actionBar && (activity.actionBar.title = L("login", "Login"));
        }
    });
    $.loginForm.addEventListener("android:back", function() {
        var activity = Ti.Android.currentActivity;
        activity.finish();
    });
    __defers["$.__views.buttonLogin!click!actionLogin"] && $.__views.buttonLogin.addEventListener("click", actionLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;