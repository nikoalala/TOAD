exports.index = function(req, res){
  var items = [{ 'firstName': 'Jean', 'lastName': 'Neige'}, { 'firstName': 'Jhon', 'lastName': 'Snow'}]
  var headers = ["First Name", "Last Name"];
  res.render('index', {items: items, headers: headers});
};
