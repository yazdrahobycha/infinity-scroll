const apiKey = 'd9SlC5WKgysSPgHeh4Nmx51gAaikiaFIGLDVKO1Pqdc';
const imgNum = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgNum}`;
let jsonData = [];
const imgContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');
let loadedItems = 0;
let isReady = false;

// Create elements for links & photos, add to DOM
function displayPhotos() {
    jsonData.forEach((photo) => {
        
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        
        // Add load event listener to check when each is finished loading
        img.addEventListener('load', () => {
            loadedItems++;
            if (loadedItems === jsonData.length) {
                isReady = true;
                loadedItems = 0;
                loader.hidden = true;
            }
        });
        
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotoes() {
    try {
        const response = await fetch(apiUrl);
        jsonData = await response.json();
        displayPhotos();
    } catch (error) {
        alert('Error: Exeded API requests, Im sorry brooo, wait an hour or so plz');
    }
}

// Infinite scroll inmplementation
window.addEventListener('scroll', () => {
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 && isReady
        ) {
            isReady = false;
            getPhotoes();
        }
    });

getPhotoes();
