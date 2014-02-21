function Controller() {
    function tableClick(e) {
        var dataId = e.rowData.dataId;
        e.rowData.someRandomVar;
        var detailController = Alloy.createController("detail", {
            parentTab: $.tabList,
            dataId: dataId
        });
        $.tabList.open(detailController.getView());
    }
    function tableLongPress(e) {
        var dataId = e.rowData.dataId;
        var dialog = Ti.UI.createOptionDialog({
            options: [ "View", "Delete", "Cancel" ],
            cancel: 2,
            destructive: 1,
            persistent: false,
            dataId: dataId
        });
        dialog.addEventListener("click", function(e) {
            var index = e.index;
            var dataId = e.source.dataId;
            if ("" !== dataId && 0 === index) {
                var detailController = Alloy.createController("detail", {
                    parentTab: $.tabList,
                    dataId: dataId
                });
                $.tabList.open(detailController.getView());
            } else if ("" !== dataId && 1 === index) {
                var AppData = require("data");
                AppData.deleteItem(dataId);
                Ti.App.fireEvent("dataUpdated");
            }
            dialog.hide();
            dialog = null;
        });
        dialog.show();
    }
    function openAddItem() {
        alert("Not Implemented");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.list = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "list"
    });
    $.__views.__alloyId2 = Ti.UI.createView({
        id: "__alloyId2"
    });
    $.__views.list.add($.__views.__alloyId2);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        id: "activityIndicator"
    });
    $.__views.__alloyId2.add($.__views.activityIndicator);
    $.__views.labelNoRecords = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        visible: false,
        top: 20,
        id: "labelNoRecords"
    });
    $.__views.__alloyId2.add($.__views.labelNoRecords);
    $.__views.tableRecords = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        top: 0,
        id: "tableRecords"
    });
    $.__views.__alloyId2.add($.__views.tableRecords);
    $.__views.tabList = Ti.UI.createTab({
        window: $.__views.list,
        id: "tabList"
    });
    $.__views.tabList && $.addTopLevelView($.__views.tabList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabList.title = L("list", "List");
    $.list.title = L("list", "List1");
    Ti.App.addEventListener("dataUpdated", function() {
        if (!_.isEmpty($.tableRecords.data)) {
            $.tableRecords.data = [];
            $.tableRecords.removeEventListener("click", tableClick);
            $.tableRecords.removeEventListener("longpress", tableLongPress);
        }
        $.activityIndicator.show();
        $.labelNoRecords.visible = false;
        setTimeout(function() {
            $.activityIndicator.hide();
            var AppData = require("data");
            var dataStore = AppData.getAll();
            if (dataStore.length) {
                var recordData = [];
                for (var i = 0; dataStore.length > i; i++) {
                    var record = dataStore[i];
                    var row = Ti.UI.createTableViewRow({
                        title: record.title,
                        dataId: i,
                        className: "row",
                        objName: "row",
                        height: Alloy.Globals.Styles.TableViewRow.height,
                        someRandomVar: "Just as an example " + i
                    });
                    recordData.push(row);
                }
                $.tableRecords.setData(recordData);
            } else {
                $.labelNoRecords.text = L("noRecordsFound", "No Records Found");
                $.labelNoRecords.visible = true;
            }
            $.tableRecords.addEventListener("click", tableClick);
            $.tableRecords.addEventListener("longpress", tableLongPress);
        }, 2e3);
    });
    Ti.App.fireEvent("dataUpdated");
    $.list.addEventListener("focus", function() {
        if (Alloy.Globals.tabGroup.activity) {
            var activity = Alloy.Globals.tabGroup.activity;
            activity.invalidateOptionsMenu();
            activity.onCreateOptionsMenu = function(e) {
                var menu = e.menu;
                var menuItem1 = menu.add({
                    title: L("addItem", "Add Item"),
                    showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER
                });
                menuItem1.addEventListener("click", openAddItem);
            };
            Alloy.Globals.Android.Api >= 11 && activity.actionBar && (activity.actionBar.title = L("list", "List"));
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;