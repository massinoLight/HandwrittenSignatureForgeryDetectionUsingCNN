var data ;
var myJSON;
var xpos;
var ypos;
var startTime;



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

}






var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function () {
        var json = JSON.stringify(myJSON),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());


Pressure.set('#el1', {
  start: function(event){
    startTime = new Date().getTime();


    document.getElementById("signature-pad").onmousemove = findScreenCoords;

     data = { X: event.clientX, Y: event.clientY, Pression: event.pressure };
     myJSON = JSON.stringify(data);


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
    myJSON=myJSON+ ",\n" +temp;

  },
  unsupported: function(){
    console.log('Incompatibilité');
  }
});

