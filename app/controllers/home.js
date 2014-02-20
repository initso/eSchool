//
// View Language
//
$.tabHome.title = L('home', 'Home');
$.home.title = L('home', 'Home');
$.labelHome.text = L('labelHome', 'Welcome Test User!');

//
// Action Handlers
//
function actionLogout() {
	//var AppData = require('data');
	var Cloud = require('ti.cloud');

	Cloud.Users.logout(function(e) {
		if (e.success) {
			// Android close app, iOS open login controller
			if (OS_ANDROID) {
				var activity = Ti.Android.currentActivity;
				activity.finish();
			} else {
				var loginController = Alloy.createController('login');
				loginController.getView().open();
				Alloy.Globals.tabGroup.close();
				Alloy.Globals.tabGroup = null;
			}
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

//
// Navigation
//

// Android
if (OS_ANDROID) {
	$.home.addEventListener('focus', function() {
		if (Alloy.Globals.tabGroup.activity) {
			var activity = Alloy.Globals.tabGroup.activity;

			// Menu
			activity.invalidateOptionsMenu();
			activity.onCreateOptionsMenu = function(e) {
				var menu = e.menu;
				var menuItem1 = menu.add({
					title : L('logout', 'Logout'),
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
				});
				menuItem1.addEventListener('click', actionLogout);
			};
		}
	});
}

// iOS
if (OS_IOS) {
	var btnRightNav = Ti.UI.createButton({
		title : L('logout', 'Logout')
	});
	btnRightNav.addEventListener('click', actionLogout);
	$.home.rightNavButton = btnRightNav;
}