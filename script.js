const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'i9PlJmJUbxHj0h0tpwb89nsUCnO5qIs0VQfxa4rsU0c';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        isReady = true;
        loader.style.display = 'none';
    }
}

// Display photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.urls.small;
        img.alt = photo.alt_description;
        img.addEventListener('load', () => {
            img.classList.add("show");
            imageLoaded();
        });
        imageContainer.appendChild(img);
    });
}

// Fetch photos from API
async function getPhotos() {
    loader.style.display = 'block';
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

// Scroll event → load more
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReady) {
        isReady = false;
        getPhotos();
    }
});

// On Load
getPhotos();
