const apiKey = '4DHtOQWvdfTNan8gSIf9k0vIJoMgS9D0CBjR3KrPMS54B6OOyDH9YGJM'
const photoGrid = document.getElementById('photoGrid')
const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')
//const apiUrl = 'https://api.pexels.com/v1/search?query=random&per_page=50'
let currentPage = 1;
let isLoading = false;

// async function pageLoad() {
//     try {
//         const res = await fetch(apiUrl, {
//             headers: {
//                 'Authorization': `${apiKey}`
//             }
//         })
//         if (!res.ok) {
//             throw new Error('failed to fetch photo')
//         }
//         const photos = await res.json()
//         console.log(photos)
//         renderPhotos(photos);
//     } catch (error) {
//         console.error('error', error)
//     }
// }

// fetch photos from api
async function fetchPhotos(url) {
    isLoading = true;
    const res = await fetch(url, {
        headers: {
            Authorization:  `${apiKey}`
        }
    })
    if (res.ok) {
        const data = await res.json()
        console.log(data)
        renderPhotos(data.photos)
    } else {
        console.error('error', res.status)
        isLoading = false;
    }
}

// render photos in the grid
function renderPhotos(photos) {
    photoGrid.innerHTML = ''
    photos.forEach(photo => {
        const container = document.createElement('div')
        container.classList.add('photo-container')

        const imgElement = document.createElement('img')
        imgElement.src = photo.src.tiny

        const buttonEl = document.createElement('button')
        buttonEl.textContent = 'Save'
        buttonEl.classList.add('hover-button')
        
        container.appendChild(imgElement)
        container.appendChild(buttonEl)

        photoGrid.appendChild(container)
    })
}

// fetch initial photos on page load
function fetchInitialPhotos() {
    const curatedPhotosUrl = `https://api.pexels.com/v1/curated?per_page=30${currentPage}`;
    fetchPhotos(curatedPhotosUrl)
}

function fetchSearchResults(query) {
    currentPage++;
    const searchUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=30${currentPage}`;
    fetchPhotos(searchUrl)
}

// fetch more photos for infinite scroll
// function fetchMorePhotos() {
//     currentPage++;
//     const curatedPhotosUrl = `https://api.pexels.com/v1/curated?per_page=15${currentPage}`;
//     fetchPhotos(curatedPhotosUrl)
// }

// search button click event
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim()
    if (query) {
        fetchSearchResults(query)
    }
})

// search bar enter event
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim()
        if (query) {
            fetchSearchResults(query)
        }
    }
})

// infinity scroll
window.addEventListener('scroll', () => {
    if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading
    ) {
        fetchSearchResults(query)
    }
})

fetchInitialPhotos()
//fetchRandomPhotos()
