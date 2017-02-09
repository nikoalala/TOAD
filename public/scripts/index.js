$( document ).ready(function() {

	//Gestion du header
	var largeur = screen.width,
    hauteur = screen.height;


	$(window).scroll(function() {
		
		
		
		if(document.documentElement.scrollTop || document.body.scrollTop +$("#headerBar").height() > $("#background-video").height() ){
			var videoPasse = true;
		}else{
			var videoPasse = false;
		}
		
		if (videoPasse) {
			
			var player = $('#background-video').data('ytPlayer').player;
			player.pauseVideo();
			
			//On ajoute le kart
			document.body.appendChild(kartingImage);
			kartingImage.style.display = "block";
			document.getElementById('headerGrayBarKarting').style.display = "block";
			
			//Menu hors video
			$(".navbar-fixed-top").addClass("top-nav-collapse");
			
			$("#headerBar").addClass("headerBarBlanc");
			$("#headerBar").removeClass("headerBar");
      
			//On change l'icone car nous sommes hors video
			document.getElementById('logoNumericup').src='/toad/images/header/logo_numericup_top_little.png';
      	
			$("#barNavigation").addClass("barNavigationNoir");
			$("#barNavigation").removeClass("barNavigation");
			
		}else{
    	
			var player = $('#background-video').data('ytPlayer').player;
			player.playVideo();
			
	    	//On change l'icone car nous sommes sur la video
	    	document.getElementById('logoNumericup').src='/toad/images/header/logo_numericup_top_medium.png';
	    	
	    	//On enleve le kart
	    	document.getElementById('headerGrayBarKarting').style.display = 'none'; 
	    	kartingImage.style.display = "none";
	    	
			//Menu video : transparent
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
			
			$("#headerBar").addClass("headerBar");
			$("#headerBar").removeClass("headerBarBlanc");

			$("#barNavigation").addClass("barNavigation");
			$("#barNavigation").removeClass("barNavigationNoir");

    }
  });
	
	
	
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
  	kartingImage.style.top = "25px";
  	kartingImage.style["z-index"] = 1031;
  	kartingImage.src = "/toad/images/header/kart_head.png";  	
  	 
    $( window ).scroll(function() {
    	
    	var palier1 = $("#background-video").height() + $("#ancrePresentation").height();
    	var palier2 = palier1 + $(".kartingGame").height();
    	var palier3 = palier2 +  $("#partenaires").height() ;
    	
    	var windowHeight = Math.max($(document).height(), $(window).height())-getBrowserDimensions().height+$("#headerBar").height();
    	var windowWidth = getBrowserDimensions().width;
    	var position = document.documentElement.scrollTop || document.body.scrollTop;
    	
    	//Définition des paliers (chaque element : Presentation, Entraine toi, resultat etc...)
    	if((document.documentElement.scrollTop || document.body.scrollTop) < palier1){
    		//Le kart ne doit pas dépasser le menu "Entraine-toi"
    		console.log("Palier 1");
    		kartingImage.style.left = (position/windowHeight)*windowWidth +"px";
    	}else if((document.documentElement.scrollTop || document.body.scrollTop) < palier2){
    		//Le kart ne doit pas dépasser le menu "Sponsors"
    		console.log("Palier 2");
    		kartingImage.style.left = (position/windowHeight)*windowWidth+  +"px";
    	}else if((document.documentElement.scrollTop || document.body.scrollTop) < palier3){
    		console.log("Palier 3");
    		kartingImage.style.left = (position/windowHeight)*windowWidth +"px";
    	}else{
    		console.log("Palier non defini");
    		kartingImage.style.left = (position/windowHeight)*windowWidth +"px";
    	}
    
    	


	  	
	});
});