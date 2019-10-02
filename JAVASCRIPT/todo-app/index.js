document.getElementById("submit").addEventListener("click", arrpush);
var arr = JSON.parse(localStorage.getItem("arr")) || [];

function arrpush(){
    arr.push(document.getElementById('text').value);
    document.getElementById("items").innerHTML = ""; 
    localStorage.arr = JSON.stringify(arr);
    display();
}
function display(){
    document.getElementById("items").innerHTML = "";
    for(let i = 0;i<arr.length;i++){
    document.getElementById("items").innerHTML += `<li>${arr[i]}</li>`;   
    }   
}
window.onload = function(){
    display();
  }

var h = 1;
var i = 2;
var t = h+i;
