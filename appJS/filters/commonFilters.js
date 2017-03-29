'use strict';
medVision
.filter('convertMinSec', [function() {
	return function(_ms) {
	  var duration = moment.duration(_ms);
	  if (duration.asHours() > 1) {
		return Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(":mm:ss");
	  } else {
		return moment.utc(duration.asMilliseconds()).format("mm:ss");
	  }
	};
}]);