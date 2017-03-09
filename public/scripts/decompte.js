/**
 * Compte a rebours des jours, heures, minutes, secondes.
 */
(function(document) {
	
	/** Date de l'evenement */
	var mDeadline = 'September 27 2017 18:00:00 UTC+0100';
	/** Millisecondes entre la date du jour et la date de l'evenement */
	var mCount;
	/** Variable pointant sur la fonction repetitive */
	var mInterval;

	/** Compte le nombre de flips pour savoir quelle est la face a actualiser (0 ou 1) */
	var indS=1;
	var indM=1;
	var indH=1;
	var indJ=1;
	
	/**
	 * Calcul les jours, heures, minutes, secondes a partir du delay
	 */
	function getTimeRemaining(delay){
	  var seconds = Math.floor( (delay/1000) % 60 );
	  var minutes = Math.floor( (delay/1000/60) % 60 );
	  var hours = Math.floor( (delay/(1000*60*60)) % 24 );
	  var days = Math.floor( delay/(1000*60*60*24) );
	  return {
	    'days': days,
	    'hours': hours,
	    'minutes': minutes,
	    'seconds': seconds
	  };
	}
	
	/**
	 * Met a jour l'affichage
	 */
	function updateClock(){
	  var now = getTimeRemaining(mCount);
	  
	  if(mCount<=0){
		  $('.decompteSecondes0').text('0');
		  $('.decompteMinutes0').text('0');
		  $('.decompteHeures0').text('0');
		  $('.decompteJours0').text('0');
		  clearInterval(mInterval);
	  }
	  else{
		  var nowPlus1 = getTimeRemaining(mCount+1000);

		  updateNumberAndFlip('decompteSecondes', now.seconds, indS++);
		  
		  if(now.minutes != nowPlus1.minutes)
			  updateNumberAndFlip('decompteMinutes', now.minutes, indM++);
		  if(now.hours != nowPlus1.hours)
			  updateNumberAndFlip('decompteHeures', now.hours, indH++);
		  if(now.days != nowPlus1.days)
			  updateNumberAndFlip('decompteJours', now.days, indJ++);
	  }
	}
	
	/**
	 * Mise a jour du chiffre et tourne la div
	 * @param id decompteSecondes, decompteMinutes, decompteHeures ou decompteJours
	 * @param value chiffre a afficher
	 */
	function updateNumberAndFlip(id, value, ind){
		//Sans flip
		//$('.'+id+'0').text(value);
		
		//Avec flip
		$('.'+id+ind%2).text(value);
		$('#'+id+'Flip').toggleClass("flip-containerFlip");
	}

	/**
	 * Calcul le delay et lance le decompte
	 */
	function countdown() {
		//Initialisation
		if(mCount == undefined){
			mCount = Date.parse(mDeadline) - Date.parse(new Date());
			var now = getTimeRemaining(mCount);
			$('.decompteSecondes0').text(now.seconds);
			$('.decompteMinutes0').text( now.minutes);
			$('.decompteHeures0').text(now.hours);
			$('.decompteJours0').text(now.days);
		}
		
		//Lancement du compte a rebours
		if(mCount > 0){
			mInterval = setInterval(function(){
				mCount=mCount-1000;
				updateClock();
				}, 1000);
		}
	}

	$(document).ready($.proxy(countdown));
	
})(window.document);