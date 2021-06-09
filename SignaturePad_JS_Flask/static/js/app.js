var wrapper = document.getElementById("signature-pad");
var clearButton = wrapper.querySelector("[data-action=clear]");
var undoButton = wrapper.querySelector("[data-action=undo]");
var savePNGButton = wrapper.querySelector("[data-action=save-png]");
var saveJPGButton = wrapper.querySelector("[data-action=save-jpg]");
//var saveJSONButton = wrapper.querySelector("[data-action=save-json]");

var fileName = "signature"+"";

var canvas = wrapper.querySelector("canvas");
var signaturePad = new SignaturePad(canvas, {

  backgroundColor: 'rgb(255, 255, 255)'
});



function resizeCanvas() {

  var ratio =  Math.max(window.devicePixelRatio || 1, 1);

  // This part causes the canvas to be cleared
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);


  signaturePad.clear();
}


window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
  if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
    window.open(dataURL);
  } else {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }
}


function dataURLToBlob(dataURL) {

  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

undoButton.addEventListener("click", function (event) {
  var data = signaturePad.toData();

  if (data) {
    data.pop(); // remove the last dot or line
    signaturePad.fromData(data);
  }
});

savePNGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Merci de signer sur le pavé.");
  } else {
    var dataURL = signaturePad.toDataURL();
    download(dataURL, fileName+".png");
  }
});

saveJPGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Merci de signer sur le pavé.");
  } else {
    var dataURL = signaturePad.toDataURL("image/jpeg");
    download(dataURL, fileName+".jpeg");
  }
});


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
        a.download = fileName+".json";
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














