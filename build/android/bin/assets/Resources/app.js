var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Android = {
    Api: Ti.Platform.Android.API_LEVEL
};

Alloy.Globals.Styles = {
    TableViewRow: {
        height: 45
    }
};

Alloy.createController("index");