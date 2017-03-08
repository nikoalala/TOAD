(function(document) {
	
	var mDeadline = 'September 27 2017 18:00:00 UTC+0100';
	var mCount;
	var mInterval;
	
	function getTimeRemaining(){
	  var seconds = Math.floor( (mCount/1000) % 60 );
	  var minutes = Math.floor( (mCount/1000/60) % 60 );
	  var hours = Math.floor( (mCount/(1000*60*60)) % 24 );
	  var days = Math.floor( mCount/(1000*60*60*24) );
	  return {
	    'days': days,
	    'hours': hours,
	    'minutes': minutes,
	    'seconds': seconds
	  };
	}
	
	function updateClock(){
	  var t = getTimeRemaining();
	  $('.decompteSecondes').text(t.seconds);
	  $('.decompteMinutes').text(t.minutes);
	  $('.decompteHeures').text(t.hours);
	  $('.decompteJours').text(t.days);
	  if(mCount<=0){
		  $('.decompteSecondes').text('0');
		  $('.decompteMinutes').text('0');
		  $('.decompteHeures').text('0');
		  $('.decompteJours').text('0');
		  clearInterval(mInterval);
	  }
	}

	function countdown() {
		if(mCount == undefined){
			mCount = Date.parse(mDeadline) - Date.parse(new Date());
// Tests
// var mDeadline2 = 'September 27 2017 17:59:55 UTC+0100';
// mCount = Date.parse(mDeadline) - Date.parse(mDeadline2);
		}
		
		if(mCount > 0){
			mInterval = setInterval(function(){
//				console.log(mCount);
				updateClock();
				mCount=mCount-1000;
				}, 1000);
		}
	}

	$(document).ready($.proxy(countdown));
	
})(window.document);