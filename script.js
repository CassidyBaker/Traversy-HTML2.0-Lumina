//  Lightbox -------------------------------------------------------

// images is the array of images in the images div in the html
const images = document.querySelectorAll('.img-gallery div img');

// The modal lighbox is hidden until an image needs to be loaded.
const lb = document.getElementById('modal');

const imageDisplay = document.querySelector('#modal_content img');

const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const closeBtn = document.getElementById('closeBtn');

const currentImg = document.getElementById('current#');
const totalImg = document.getElementById('total#');
//index of current image
let currentNo = 0;

// open modal content div if images are clicked
images.forEach((e) => e.addEventListener('click', showlb));

// close if modal background or X is clicked
lb.addEventListener('click', hidelb);
closeBtn.addEventListener('click', hidelb);

function showlb(e) {
  // show lightbox
  lb.style.display = 'flex';

  // lightBox drives the loading of all data and images
  lightBox(e);
}

function hidelb(e) {
  // only close if close button or background screen was clicked on.
  if (e.srcElement.id === 'modal' || e.srcElement.id == 'closeBtn') {
    lb.style.display = 'none';
    currentNo = 0;
  }
}

function lightBox(e) {
  // get current image index by matching e.srcElement.currentSrc to array of images

  while (
    e.srcElement.getAttribute('src') != images[currentNo].getAttribute('src')
  ) {
    currentNo++;
  }

  //activate navigation arrows.
  leftArrow.style.display = 'inline';
  rightArrow.style.display = 'inline';

  leftArrow.onclick = clickArrow;
  rightArrow.onclick = clickArrow;

  //load clicked image
  loadImage(currentNo);
}

function loadImage(currentNo) {
  // each image on webpage has an attribue named data-modal which stores the link to the image that should be displayed IN THE LIGHTBOX.  This allows a larger image for lightbox than what is displayed on-screen.

  imageDisplay.src = images[currentNo].getAttribute('data-modal');

  leftArrow.style.display = 'inline';
  rightArrow.style.display = 'inline';

  // hide left and right arrow on ends of array
  if (currentNo === 0) {
    leftArrow.style.display = 'none';
  } else if (currentNo === images.length - 1) {
    rightArrow.style.display = 'none';
  }

  // set numbers in figcaption
  currentImg.innerHTML = currentNo + 1;
  totalImg.innerHTML = images.length;
}

//when either navigation arrow is clicked.
function clickArrow(e) {
  if (e.srcElement.id === 'leftArrow') {
    currentNo--;
  } else if (e.srcElement.id === 'rightArrow') {
    currentNo++;
  }

  loadImage(currentNo);
}
