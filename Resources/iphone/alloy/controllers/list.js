function Controller() {
    function createRow(time, name, prof, i) {
        var tableRow = Ti.UI.createTableViewRow({
            dataId: i,
            className: "row",
            objName: "row",
            height: Alloy.Globals.Styles.TableViewRow.height
        });
        console.log(i);
        var timeView = Ti.UI.createView({
            left: 0,
            width: "40%",
            height: Ti.UI.Size
        });
        var nameView = Ti.UI.createView({
            left: "40%",
            width: "60%",
            height: Ti.UI.Size
        });
        var profView = Ti.UI.createView({
            left: "75%",
            width: "25%",
            height: Ti.UI.Size
        });
        timeView.add(Ti.UI.createLabel({
            top: 5,
            right: 5,
            bottom: 5,
            left: 5,
            text: time,
            color: "#000"
        }));
        nameView.add(Ti.UI.createLabel({
            top: 5,
            right: 5,
            bottom: 5,
            left: 5,
            text: name,
            color: "#000"
        }));
        tableRow.add(timeView);
        tableRow.add(nameView);
        timeView = nameView = profView = null;
        return tableRow;
    }
    function tableClick(e) {
        var dataId = e.rowData.dataId;
        console.log(dataId);
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
            } else "" !== dataId && 1 === index && AppData.deleteItem(dataId);
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
        backgroundImage: "images/eSchool.jpg",
        id: "list"
    });
    $.__views.__alloyId4 = Ti.UI.createView({
        id: "__alloyId4"
    });
    $.__views.list.add($.__views.__alloyId4);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "activityIndicator"
    });
    $.__views.__alloyId4.add($.__views.activityIndicator);
    $.__views.labelNoRecords = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        visible: false,
        top: 20,
        id: "labelNoRecords"
    });
    $.__views.__alloyId4.add($.__views.labelNoRecords);
    $.__views.tableRecords = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        top: 0,
        backgroundColor: "transparent",
        id: "tableRecords"
    });
    $.__views.__alloyId4.add($.__views.tableRecords);
    $.__views.tabList = Ti.UI.createTab(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            icon: "images/4_collections_view_as_list.png"
        });
        _.extend(o, {
            window: $.__views.list,
            id: "tabList"
        });
        return o;
    }());
    $.__views.tabList && $.addTopLevelView($.__views.tabList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabList.title = L("list", "Schedule");
    $.list.title = L("list", "Schedule");
    var AppData = require("data");
    Ti.App.addEventListener("dataUpdated", function() {
        if (!_.isEmpty($.tableRecords.data)) {
            $.tableRecords.data = [];
            $.tableRecords.removeEventListener("click", tableClick);
            $.tableRecords.removeEventListener("longpress", tableLongPress);
        }
        $.activityIndicator.show();
        $.labelNoRecords.visible = false;
        AppData.getAll(function(dataStore) {
            if (dataStore.length) {
                var recordData = [];
                for (var i = 0; dataStore.length > i; i++) {
                    var record = dataStore[i];
                    console.log(dataStore[i]);
                    recordData.push(createRow(record.time, record.subject, record.teacher, i));
                }
                $.tableRecords.setData([]);
                $.tableRecords.setData(recordData);
            } else {
                $.labelNoRecords.text = L("noRecordsFound", "No Records Found");
                $.labelNoRecords.visible = true;
            }
            $.tableRecords.addEventListener("click", tableClick);
            $.tableRecords.addEventListener("longpress", tableLongPress);
            $.activityIndicator.hide();
        });
    });
    var btnRightNav = Ti.UI.createButton({
        title: L("addItem", "Add Item")
    });
    btnRightNav.addEventListener("click", openAddItem);
    $.list.rightNavButton = btnRightNav;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;