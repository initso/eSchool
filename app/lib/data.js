var Cloud = require('ti.cloud');

var userType = ' ';
var userName = ' ';

//DateStamp generator to store lecture details
function dateStampGen() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	//January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}

	today = yyyy + '-' + mm + '-' + dd + "T00:00:00+0000";
	return today;
}

//Todays Day for the Schedule
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

//TODO: Persistent Login
//
// Login stuff
//
var loggedIn = false;

// Check for persisted login
if (Ti.App.Properties.getString('loggedIn')) {
	loggedIn = true;
}

exports.isLoggedIn = function() {
	return loggedIn;
};

exports.login = function(username, password, callback) {
	if (username !== 'error') {
		loggedIn = true;
		Ti.App.Properties.setString('loggedIn', 1);

		// setTimeout to simulate delay of calling remote service
		setTimeout(function() {
			callback({
				result : 'ok'
			});
		}, 1500);
	} else {
		setTimeout(function() {
			callback({
				result : 'error',
				msg : 'Username "error" triggers login error'
			});
		}, 1500);
	}
};

exports.logout = function(callback) {
	loggedIn = false;
	Ti.App.Properties.removeProperty('loggedIn');
	callback({
		result : 'ok'
	});
};

//
// App data and methods
//
var today = gettDay();
var dataStore = [];
var dateStamp = dateStampGen();
var teacherSchedule = [];
var summary = [];
var teachesAt = ["IXA"];
var className = '';
//TODO: Build this Datastore from the cloud

//GET todays Schedule normal for Teachers
function Schedule(user, type, teachesAt, callback) {
	for (var k = 0; k < teachesAt.length; k++) {
		className = teachesAt[k];
		console.log(className);
		Cloud.Objects.query({
			classname : className,
			page : 1,
			per_page : 10,
			where : {
				"Day" : {
					"$regex" : today
				}
			}
		}, function(e) {
			if (e.success) {
				console.log("Hello World");
				for (var i = 0; i < e[className].length; i++) {
					var timetable = e[className][i];
					console.log(timetable);
					dataStore = timetable.Timetable;

				}
				for (var j = 0; j < dataStore.length; j++) {
					if (dataStore[j].teacher == user) {
						console.log("GOOD");
						teacherSchedule.push(dataStore[j]);
					}
				}
				console.log("In loop:" + dataStore);
				callback();
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}
}

//GET Lecture Summary
function lectSummary(teachesAt, callback) {
	className = teachesAt + "pastLectures";
	console.log(className);
	Cloud.Objects.query({
		classname : className,
		page : 1,
		per_page : 10,
		where : {
			"DateStamp" : dateStamp
		}
	}, function(e) {
		if (e.success) {
			console.log("Hello World");
			for (var i = 0; i < e[className].length; i++) {
				var timetable = e[className][i];
				console.log(timetable);
				summary = timetable.lecSummary;

			}

			console.log("In loop:" + summary);
			callback();
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

// Delete
exports.deleteItem = function(id) {
	dataStore.splice(id, 1);
};

// Get
exports.getItem = function(id) {
	return dataStore[id];
};


//Get Summary of Lectures for a day
exports.getSummary = function(callback) {
	lectSummary("IXA", function() {
		console.log("reTurning:" + summary);
		callback(summary);
	});
};

// GetAll
exports.getAll = function(callback) {
	console.log(this.userName);
	if (this.userType == "Student") {
		Schedule(this.userName, this.userType, ["IXA"], function() {
			console.log("reTurning:" + dataStore);
			callback(dataStore);
		});
	} else if (this.userType == "teacher") {
		Schedule(this.userName, this.userType, ["IXA"], function() {
			console.log("reTurning:" + teacherSchedule);
			callback(teacherSchedule);
		});
	}
};

//Get Teacher Schedule
exports.getTeacherSchedule = function() {
	console.log(this.userName);
	Schedule(this.userName, this.userType, ["IXA"], function() {
		console.log("reTurning:" + teacherSchedule);
		return teacherSchedule;
	});
};

exports.getUserName = function() {
	return userName;
};

exports.getUserType = function() {
	return userType;
};
