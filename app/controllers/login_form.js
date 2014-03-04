//
// Action handlers
//

function actionLogin(e) {
	if (!$.inputUsername.value || !$.inputPassword.value) {
		var dialog = Ti.UI.createAlertDialog({
			message : L('formMissingFields', 'Please complete all form fields'),
			ok : 'OK',
			title : L('actionRequired', 'Action Required')
		}).show();
	} else {
		$.activityIndicator.show();
		$.buttonLogin.enabled = false;

		var AppData = require('data');
		var Cloud = require('ti.cloud');

		// Cloud.Users.create({
		// email : 'test@mycompany.com',
		// first_name : 'test_firstname',
		// last_name : 'test_lastname',
		// password : 'test_password',
		// password_confirmation : 'test_password'
		// }, function(e) {
		// if (e.success) {
		// var user = e.users[0];
		// alert('Success:\n' + 'id: ' + user.id + '\n' + 'sessionId: ' + Cloud.sessionId + '\n' + 'first name: ' + user.first_name + '\n' + 'last name: ' + user.last_name);
		// } else {
		// alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		// }
		// });

		Cloud.Users.login({
			login : $.inputUsername.value,
			password : $.inputPassword.value
		}, function(e) {
			$.activityIndicator.hide();
			$.buttonLogin.enabled = true;
			if (e.success) {
				var user = e.users[0];
				//Set User name and type for future in your local Data
				AppData.userName = user.username;
				AppData.userType = user.custom_fields.type;
				var indexController = Alloy.createController('index');				
				if (OS_IOS) {
					Alloy.Globals.navgroup.close();
					Alloy.Globals.navgroup = null;
				} else if (OS_ANDROID) {
					$.loginForm.close();
					$.loginForm = null;
				}
			} else {
				$.inputPassword.value = '';
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});

		// AppData.login($.inputUsername.value, $.inputPassword.value, function(response) {
		// $.activityIndicator.hide();
		// $.buttonLogin.enabled = true;

		// if (response.result === 'ok') {
		// var indexController = Alloy.createController('index');
		//
		// if (OS_IOS) {
		// Alloy.Globals.navgroup.close();
		// Alloy.Globals.navgroup = null;
		// } else if (OS_ANDROID) {
		//
		// $.loginForm.close();
		// $.loginForm = null;
		//
		// }
		// } else {
		// $.inputPassword.value = '';
		// alert(L('error', 'Error') + ':\n' + response.msg);
		// }
		// });

	}
}

function openRegister(e) {
	var registerController = Alloy.createController('register').getView();

	if (OS_IOS) {
		Alloy.Globals.navgroup.open(registerController);
	} else if (OS_ANDROID) {
		registerController.open();
	}
}

//
// View Language
//
$.loginForm.title = L('login', 'Login');
$.inputUsername.hintText = L('username', 'Username');
$.inputPassword.hintText = L('password', 'Password');
$.buttonLogin.title = L('login', 'Login');

//
// Navigation
//

// Android
if (OS_ANDROID) {
	$.loginForm.addEventListener('open', function() {
		if ($.loginForm.activity) {
			var activity = $.loginForm.activity;

			// Menu
			activity.invalidateOptionsMenu();
			activity.onCreateOptionsMenu = function(e) {
				var menu = e.menu;
				var menuItem1 = menu.add({
					title : L('register', 'Register'),
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
				});
				menuItem1.addEventListener('click', openRegister);
			};

			// Action Bar
			if (Alloy.Globals.Android.Api >= 11 && activity.actionBar) {
				activity.actionBar.title = L('login', 'Login');
			}
		}
	});

	// Back Button
	$.loginForm.addEventListener('android:back', function() {
		var activity = Ti.Android.currentActivity;
		activity.finish();
	});
}

// iOS
if (OS_IOS) {
	var btnRightNav = Ti.UI.createButton({
		title : L('register', 'Register')
	});
	btnRightNav.addEventListener('click', openRegister);
	$.loginForm.rightNavButton = btnRightNav;
}