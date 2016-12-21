var color =  "blue";
var count = 10;
$('#info').css("color" , "blue");

var blueEdges = {
  1:[],
  2:[],
  3:[],
  4:[],
  5:[],
  6:[]
}

var redEdges = {
  1:[],
  2:[],
  3:[],
  4:[],
  5:[],
  6:[]
};

var intervalID = setInterval(runTick, 1000)
function runTick(){

  if(count == 0){
    count = 10;
    changeColor();
  }

  $('#timer').html("0:"+count);
  count-=1;

}
function changeColor(){
  if(color == "blue")
    color = "red";
  else
    color = "blue";
}

function addEdge(v1 , v2){
  var graph = blueEdges;
  if(color == "red") graph = redEdges;


  graph[v1].push(v2);
  graph[v2].push(v1);
}

function lose(v1,v2){

  var graph = blueEdges;

  if(color == "red") graph = redEdges;

  for (var i = 0; i < graph[v1].length; i++) {
    for (var j = 0; j < graph[v2].length; j++) {
      if(graph[v1][i] == graph[v2][j]){
        return true;
      }
    }
  }
  return false;
}

String.prototype.firstUperCase = function(){
  return this[0].toUpperCase()+this.substring(1);
}

$('.edges').click(function(){

  count=10;
  if($(this).css("background-color") != "rgb(0, 0, 255)"){

    if(color=="blue"){

      $('#info').css("color" , "red");
      $('#info').html("Turn: " + "red".firstUperCase() + " Player");
    }
    else{
      $('#info').css("color" , "blue");
      $('#info').html("Turn: " + "blue".firstUperCase() + " Player");
    }

    $(this).css("background-color" , color);

    var id = $(this).attr("id").split('-');
    var v1 = id[0][1];
    var v2 = id[1];

    addEdge(v1 , v2);
    if(lose(v1,v2)){
      $('#info').css("color","black");
      $('#info').html("Aleluya "+color+ " win!!!");
      clearInterval(intervalID)
    };
    changeColor();
  }
});
