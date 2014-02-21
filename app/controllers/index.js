// var AppData = require('data');
var Cloud = require('ti.cloud');

Cloud.Users.showMe(function(e) {
	if (e.success) {
		$.tabGroup.open();
		$.tabGroup.setActiveTab(0);
		Alloy.Globals.tabGroup = $.tabGroup;

		//
		// Navigation
		//

		// Android
		if (OS_ANDROID) {
			$.tabGroup.addEventListener('open', function() {
				if ($.tabGroup.activity) {
					var activity = $.tabGroup.activity;

					// Action Bar
					if (Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {
						activity.actionBar.title = L('appTitle', 'Demo App');
					}
				}
			});

			// Back Button
			$.tabGroup.addEventListener('android:back', function() {
				var activity = Ti.Android.currentActivity;
				activity.finish();
			});
		}
	} else {
		var loginController = Alloy.createController('login');
	}
});

