exports.index = function(req, res){
  var items = [{ "classement": 1, "societe": "VALEURIAD", "chronoCumule": "1,22.443", "pilote1Pseudo": "Coline", "pilote1Chrono": "42.003", "pilote2Pseudo": "Erwan", "pilote2Chrono": "40.440"},
    { "classement": 2, "societe": "SOGETI", "chronoCumule": "1,45.007", "pilote1Pseudo": "Jean", "pilote1Chrono": "52.004", "pilote2Pseudo": "Emile", "pilote2Chrono": "53.003"},
    { "classement": 3, "societe": "OPEN", "chronoCumule": "1,45.350", "pilote1Pseudo": "François", "pilote1Chrono": "35.000", "pilote2Pseudo": "Philippe", "pilote2Chrono": "1,10.350"},
    { "classement": 4, "societe": "CAP GEMINI", "chronoCumule": "1,46.000", "pilote1Pseudo": "Nicolas", "pilote1Chrono": "51.500", "pilote2Pseudo": "Matthieu", "pilote2Chrono": "54.500"},
    { "classement": 5, "societe": "ACCENTURE", "chronoCumule": "1,46.120", "pilote1Pseudo": "Mickael", "pilote1Chrono": "46.120", "pilote2Pseudo": "Hugo", "pilote2Chrono": "1,00.000"}]
  var headers = ["Classement", "Société", "Chrono cumulé", "Pilote 1 \nPseudo", "Pilote 1 \nChrono", "Pilote 2 \nPseudo", "Pilote 3 \nChrono"];
  res.render('index', {items: items, headers: headers});
};
