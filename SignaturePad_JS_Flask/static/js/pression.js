var startTime;


Pressure.set('#el1', {
  start: function(event){
    startTime = new Date().getTime();


    console.log('X', event.clientX,'Y', event.clientY,'Pression', event.pressure);
  },
  end: function(){
    var endTime = new Date().getTime();

     console.log((endTime-startTime),'ms');

  },

  change: function(force, event){
    console.log('Pression',force);

  },
  unsupported: function(){
    console.log('Incompatibilité');
  }
});