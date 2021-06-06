var startTime;

var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            var json = JSON.stringify(data),
                blob = new Blob([json], {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());
var data ;
var myJSON;
var xpos;
var ypos;


function findScreenCoords(mouseEvent)
{

  if (mouseEvent)
  {
    //FireFox
    xpos = mouseEvent.screenX;
    ypos = mouseEvent.screenY;
  }
  else
  {
    //IE
    xpos = window.event.screenX;
    ypos = window.event.screenY;
  }
  return xpos,ypos
  //console.log("X",xpos," Y",ypos);
}








Pressure.set('#el1', {
  start: function(event){
    startTime = new Date().getTime();


    document.getElementById("signature-pad").onmousemove = findScreenCoords;

     data = { X: event.clientX, Y: event.clientY, Pression: event.pressure };
     myJSON = JSON.stringify(data);
    //console.log('JSON',myJSON);
    //saveData(data, fileName);
    //console.log('File saved');

  },
  end: function(){
    var endTime = new Date().getTime();

     console.log((endTime-startTime),'ms');
     myJSON=myJSON+"temps(ms):"+(endTime-startTime)
     console.log('JSON',myJSON);

  },

  change: function(force, event){

    document.getElementById("signature-pad").onmousemove = findScreenCoords;

    console.log("X",xpos," Y",ypos," Pression",force);
    data = { X: xpos, Y: ypos, Pression: force };
    temp = JSON.stringify(data);
    myJSON=myJSON+ "\n" +temp;

  },
  unsupported: function(){
    console.log('Incompatibilité');
  }
});