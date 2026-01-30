// Get the modal
var modal = document.getElementById("myModal"); //Fetching the Modal window container class ".modal"

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");// Fetching the thumbnail
var modalImg = document.getElementById("img01");//Fetching the Modal content image
var captionText = document.getElementById("caption");//Fetching the text below the modal content

var ARYthumbnails=Array.from(document.getElementsByClassName("thumbnails"));


ARYthumbnails.forEach((thumbnail)=>{   // allow function doesn't work here?

  thumbnail.addEventListener("click",()=>{    //allow function doesn't work here?
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;


  });




});









// //関数///////
// img.onclick = function(){        
//   modal.style.display = "block";
//   modalImg.src = this.src;
//   captionText.innerHTML = this.alt;
// }
// //////////////
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}