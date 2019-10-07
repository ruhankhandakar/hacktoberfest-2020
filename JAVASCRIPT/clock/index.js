function NewSecond(){
    var date = new Date;
    var seconds = date.getSeconds();
   
  var x = document.getElementsByClassName("second");
  var offset = String((seconds*6)+180)+"deg";
  //console.log(offset)
  
  x[0,0].style.transform = `rotate(${offset})`;
  
    var minutes = date.getMinutes();
   
  var x = document.getElementsByClassName("minute");
  var offset = String((minutes*6)+180)+"deg";
  console.log(offset)
  
  x[0,0].style.transform = `rotate(${offset})`;
    
      var hour = date.getHours();
   
  var x = document.getElementsByClassName("hour");
  var offset = String((hour*30)+180)+"deg";
  console.log(offset)
  
  x[0,0].style.transform = `rotate(${offset})`;
    
    
  }
  
  NewSecond();
  setInterval(NewSecond, 1000);