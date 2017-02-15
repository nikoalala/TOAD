$(".top_previous").attr('onClick', 'paginer("first")');
$(".previous").attr('onClick', 'paginer("previous")');
$(".following").attr('onClick', 'paginer("next")');
$(".last_following").attr('onClick', 'paginer("last")');
$(".member").attr('style', 'pointer-events: none; cursor: default;');
$("header").remove();

// Fonction pour recuperer les params de l'url
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// Fonction pour mettre à jour les params de l'url
function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
};

//Fonction pour gerer la pagination (avant/arrierre/premiers/derniers)
function paginer(string){
  var param = string;
  //On verifie ce qui nous as ete envoye
  if(["first", "previous", "next", "last"].indexOf(param) >= 0){
    var rank_start = parseInt( $(".results_table tbody tr .rank").html());
    // Variable rank_count definie dans le HTML par defaut a 20
    var diff = 0;
    switch(param){
      case 'first':
        rank_start = 1;
        break;
      case 'previous':
        rank_start = rank_start - rank_count;
        if(rank_start < 1){
    			rank_start = 1;
    		};
        break;
      case 'next':
        rank_start = rank_start + rank_count;

        if(rank_start > parseInt( $("#number_result").html() ) ){
    			rank_start = parseInt( $("#number_result").html() ) - rank_count + 1;
    		};
        break;
      case 'last':
        // On recupere le nombre total de resutlat pour afficher la derniere page
        rank_start = parseInt( $("#number_result").html() ) - rank_count + 1;
    }
    save_parameters();
    location.href = updateQueryStringParameter(location.href, 'start', rank_start);
  }
};

//Fonction pour gerer les filtres
function filtre(){
  //Recuperation de la valeur de l'input avec l'ID search
  member_id = $("#search").val();
  //On reinitialise aussi le rang a 1 quand on filtre les resultats
	rank_start = 1;
  //Utilisation de la methode definie dans javascript_leaderboards.js
  save_parameters();
  location.href = updateQueryStringParameter(location.href, 'start', rank_start);

};
