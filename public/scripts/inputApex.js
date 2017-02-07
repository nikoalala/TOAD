$.ajax({
  url: 'http://www.apex-timing.com/gokarts/results.php?center=54&challenge=1',
  type: 'GET',
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  },
  datatype: "text/html",
  success: function(data){
    var divResults = $(data).find('#title').html;
    $('#resultats').append(divResults);
  }
});
