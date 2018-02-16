$(document).ready(function(){
  var slideIndex = 0;
  carousel();

  function carousel() {
      var i;
      var x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > x.length) {slideIndex = 1}
      x[slideIndex-1].style.display = "block";
      setTimeout(carousel, 3000); // Change image every 2 seconds
  }

  $("li").on("click",function() {
    var id = this.id;
    var x = document.getElementsByClassName("blurb");
    for (i = 0; i < x.length; i++) {
      if(x[i].id === id){
        x[i].style.display = "block";
      } else {
        x[i].style.display = "none";
      }
    }
  });
});
