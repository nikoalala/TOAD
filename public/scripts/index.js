$( document ).ready(function() {

    jQuery(function($) {

    	$('#background-video').YTPlayer({
          fitToBackground: true,
          videoId: 'cfX4Z2W6vX8',
          pauseOnScroll: false,
          callback: function() {
            videoCallbackEvents();
          }
        });
        
        var videoCallbackEvents = function() {
          var player = $('#background-video').data('ytPlayer').player;
        
          player.addEventListener('onStateChange', function(event){
              console.log("Player State Change", event);

              // OnStateChange Data
              if (event.data === 0) {          
                  console.log('video ended');
              }
              else if (event.data === 2) {          
                console.log('paused');
              }
          });
        }
      });
	
    //Gestion de l'animation du karting du header en fonction du scroll 1031
 	var kartingImage = new Image();
	kartingImage.style.position = "fixed";
	kartingImage.style.left = "0px";
	kartingImage.style.top = "4%";
	kartingImage.style["z-index"] = 1031;
	document.body.appendChild(kartingImage);
	kartingImage.src = "/toad/images/header/kartHeaderNew.png";

    $( window ).scroll(function() {
    	var windowHeight = Math.max($(document).height(), $(window).height())-getBrowserDimensions().height-$("#headerBar").height();
    	var windowWidth = getBrowserDimensions().width;
    	var position = document.documentElement.scrollTop || document.body.scrollTop;

	  	kartingImage.style.left = (position/windowHeight)*windowWidth+"px";
	});
});