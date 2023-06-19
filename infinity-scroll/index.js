const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const ACCESS_KEY = UNSPLASH_ACCESS_KEY;

const count = 30;
const apiURL =
  "https://api.unsplash.com/photos/random/?client_id=" +
  ACCESS_KEY +
  "&count=" +
  count;

let photosArray = [];

let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Fucntion to set attributes of a element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Display Photos
function displayPhotos() {
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // Creating <a> to link to unsplash
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //Creating <img> to display photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    //placing above elements at right place
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash Api
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    imagesLoaded = 0;
    getPhotos();
  }
});

// On Load
getPhotos();
