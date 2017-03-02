var iconValeuriadOut = 'images/map/mapValeuriadOut.png';
var iconValeuriadIn = 'images/map/mapValeuriadIn.png';

var iconKartOut = 'images/map/mapKartingOut.png';
var iconKartIn = 'images/map/mapKartingIn.png';

var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 47.216302, lng: -1.6369548},
  zoom: 13,
  disableDefaultUI: true,
  draggable: false,
  disableDoubleClickZoom: true,
  scrollwheel: false
});


var markerKart = new google.maps.Marker({
	position: {lat: 47.2342192, lng: -1.652741},
	map: map,
	title: '27 Rue Bobby Sands 44800 St Herblain',
	icon:'images/map/mapKartingOut.png'
});

var markerValeuriad = new google.maps.Marker({
	position: {lat: 47.1986399, lng: -1.604188},
	map: map,
	title: '60 Boulevard Maréchal Juin 44100 Nantes',
	icon:'images/map/mapValeuriadOut.png'
});

google.maps.event.addListener(markerValeuriad, 'mouseover', function() {
    markerValeuriad.setIcon(iconValeuriadIn);
});
google.maps.event.addListener(markerValeuriad, 'mouseout', function() {
    markerValeuriad.setIcon(iconValeuriadOut);
});
google.maps.event.addListener(markerValeuriad, 'click', function() {
    window.open("https://www.google.fr/maps/place/Valeuriad/@47.1985928,-1.6051498,18.06z/data=!4m5!3m4!1s0x4805eb7ed0540135:0xd1f95069609d7d6f!8m2!3d47.1986399!4d-1.604188");
});

google.maps.event.addListener(markerKart, 'mouseover', function() {
    markerKart.setIcon(iconKartIn);
});
google.maps.event.addListener(markerKart, 'mouseout', function() {
    markerKart.setIcon(iconKartOut);
});
google.maps.event.addListener(markerKart, 'click', function() {
    window.open("https://www.google.fr/maps/place/Karting+de+Nantes/@47.2340452,-1.653453,18.32z/data=!4m5!3m4!1s0x4805932e51d715ef:0xf1de2c8a4ed48faa!8m2!3d47.2342191!4d-1.6527406");
});