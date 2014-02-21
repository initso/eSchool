var loggedIn = false;

Ti.App.Properties.getString("loggedIn") && (loggedIn = true);

exports.isLoggedIn = function() {
    return loggedIn;
};

exports.login = function(username, password, callback) {
    if ("error" !== username) {
        loggedIn = true;
        Ti.App.Properties.setString("loggedIn", 1);
        setTimeout(function() {
            callback({
                result: "ok"
            });
        }, 1500);
    } else setTimeout(function() {
        callback({
            result: "error",
            msg: 'Username "error" triggers login error'
        });
    }, 1500);
};

exports.logout = function(callback) {
    loggedIn = false;
    Ti.App.Properties.removeProperty("loggedIn");
    callback({
        result: "ok"
    });
};

var dataStore = [];

var dataBuilt = false;

if (!dataBuilt) for (var i = 0; 10 > i; i++) {
    var row = {
        title: "Row " + i
    };
    dataStore.push(row);
}

exports.deleteItem = function(id) {
    dataStore.splice(id, 1);
};

exports.getItem = function(id) {
    return dataStore[id];
};

exports.getAll = function() {
    return dataStore;
};