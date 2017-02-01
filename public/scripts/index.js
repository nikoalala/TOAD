$( document ).ready(function() {
	//Gestion de la taille de la vidéo
    $("#videoPlayer").attr("width", getBrowserDimensions().width);
    $("#videoPlayer").attr("height", getBrowserDimensions().height-$("#headerBar").height());

    $( window ).resize(function() {
        $("#videoPlayer").attr("width", getBrowserDimensions().width);
    	$("#videoPlayer").attr("height", getBrowserDimensions().height-$("#headerBar").height());
    });

    //Gestion de l'animation du karting du header en fonction du scroll
 	var kartingImage = new Image();
	kartingImage.style.position = "fixed";
	kartingImage.style.left = "0px";
	kartingImage.style.top = "-5px";
	kartingImage.style["z-index"] = 1031;
	document.body.appendChild(kartingImage);
	kartingImage.src = "/toad/images/header/kartHeader.png";

    $( window ).scroll(function() {
    	var windowHeight = Math.max($(document).height(), $(window).height())-getBrowserDimensions().height-$("#headerBar").height();
    	var windowWidth = getBrowserDimensions().width;
    	var position = document.documentElement.scrollTop || document.body.scrollTop;

	  	kartingImage.style.left = (position/windowHeight)*windowWidth+"px";
	});
});