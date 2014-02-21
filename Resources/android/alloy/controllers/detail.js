function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.detail = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "detail"
    });
    $.__views.detail && $.addTopLevelView($.__views.detail);
    $.__views.detailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "detailLabel"
    });
    $.__views.detail.add($.__views.detailLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab || "";
    var dataId = 0 === args.dataId || args.dataId > 0 ? args.dataId : "";
    if ("" !== dataId) {
        var AppData = require("data");
        var dataItem = AppData.getItem(dataId);
        $.detail.title = dataItem.title;
        $.detailLabel.text = dataItem.title;
        $.detail.addEventListener("open", function() {
            if ($.detail.activity) {
                var activity = $.detail.activity;
                if (Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {
                    activity.actionBar.title = L("detail", "Detail");
                    activity.actionBar.displayHomeAsUp = true;
                    activity.actionBar.onHomeIconItemSelected = function() {
                        $.detail.close();
                        $.detail = null;
                    };
                }
            }
        });
        $.detail.addEventListener("android:back", function() {
            $.detail.close();
            $.detail = null;
        });
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;