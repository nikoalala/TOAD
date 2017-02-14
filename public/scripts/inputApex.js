$(".top_previous").attr('onClick', 'paginer("first")');
$(".previous").attr('onClick', 'paginer("previous")');
$(".following").attr('onClick', 'paginer("next")');
$(".last_following").attr('onClick', 'paginer("y")');

function paginer(string){
  var param = string;
  //On verifie ce qui nous as ete envoye
  if(["first", "previous", "next", "last"].indexOf(param) >= 0){
    alert("Data ok !");
  } else {
    alert("Mauvaise donnees en entree..");
  }
}
