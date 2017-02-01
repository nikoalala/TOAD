$( document ).ready(function() {
    $("#videoPlayer").attr("width", getBrowserDimensions().width);
    $("#videoPlayer").attr("height", getBrowserDimensions().height-$("#headerBar").height());

    $( window ).resize(function() {
        $("#videoPlayer").attr("width", getBrowserDimensions().width);
    	$("#videoPlayer").attr("height", getBrowserDimensions().height-$("#headerBar").height());
    });
});