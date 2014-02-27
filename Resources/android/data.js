function gettDay() {
    var currentTime = new Date();
    var daytoday = currentTime.getDay();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[daytoday];
}

var Cloud = require("ti.cloud");

var userType = " ";

var userName = " ";

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

var today = gettDay();

var dataStore = [];

var teacherSchedule = [];

var teachesAt = [ "IXA" ];

var className = "";

for (var k = 0; teachesAt.length > k; k++) {
    className = teachesAt[k];
    Cloud.Objects.query({
        classname: className,
        page: 1,
        per_page: 10,
        where: {
            Day: {
                $regex: today
            }
        }
    }, function(e) {
        if (e.success) {
            console.log("Hello World");
            for (var i = 0; e[className].length > i; i++) {
                var timetable = e[className][i];
                console.log(timetable);
                dataStore = timetable.Timetable;
            }
            for (var j = 0; dataStore.length > j; j++) dataStore[j].teacher == userName && teacherSchedule.push(dataStore[j]);
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
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

exports.getTeacherSchedule = function() {
    return teacherSchedule;
};

exports.getUserName = function() {
    return userName;
};

exports.getUserType = function() {
    return userType;
};