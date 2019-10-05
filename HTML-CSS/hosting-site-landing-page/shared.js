var button =  document.querySelectorAll(".plan button");
var backdrop = document.querySelector(".backdrop");
var backdropLabel = document.querySelector(".backdrop-label");
var hamburger = document.querySelector(".toggle-button");
var sidenav = document.querySelector(".side-navigation");
var ctaButton = document.querySelector(".main-nav__item--cta");

hamburger.addEventListener("click",function(){
    sidenav.style.display = "block";
    backdrop.style.display ="block";
});

backdrop.addEventListener("click",function(){
    sidenav.style.display = "none";
    closeModal();
});

for(var i=0; i<button.length; i++)
{
	    button[i].addEventListener("click",function(){
	    backdrop.style.display ="block";
        backdropLabel.style.display ="block";
        setTimeout(function(){
            backdropLabel.classList.add('openLabel');
        },10);
        setTimeout(function(){
            backdrop.classList.add('open');
        },10);
    });
}

var noButton = document.querySelector(".label-item-content-no");

function closeModal(){
    backdropLabel.classList.remove('openLabel');
    setTimeout(function(){
        backdropLabel.style.display ="none";
    },10);
    backdrop.classList.remove('open');
    setTimeout(function(){
        backdrop.style.display ="none";
    },10);
}

noButton.addEventListener("click",closeModal)

// var ctaButton = document.getElementsByClassName(".main-nav__item--cta");

// setInterval(function(){
//     ctaButton.classList.toggle('animation');
// },1000);

ctaButton.addEventListener("animationstart",function(event){
    console.log("animation-started",event);
});
ctaButton.addEventListener("animationend",function(event){
    console.log("animation-ended",event);
});
ctaButton.addEventListener("animationiteration",function(event){
    console.log("animation-iteration",event);
});