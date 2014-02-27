//
// Check for expected controller args
//
var args = arguments[0] || {};
var parentTab = args.parentTab || '';


// Android
if (OS_ANDROID) {
	$.lecture_summary.addEventListener('open', function() {
		if ($.lecture_summary.activity) {
			var activity = $.lecture_summary.activity;

			// Action Bar
			if (Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {
				activity.actionBar.title = L('lecture_summary', 'Lecture Summary');
				activity.actionBar.displayHomeAsUp = true;
				activity.actionBar.onHomeIconItemSelected = function() {
					$.lecture_summary.close();
					$.lecture_summary = null;
				};
			}
		}
	});

	// Back Button - not really necessary here - this is the default behaviour anyway?
	$.lecture_summary.addEventListener('android:back', function() {
		$.lecture_summary.close();
		$.lecture_summary = null;
	});
}
