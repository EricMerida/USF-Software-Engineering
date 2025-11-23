// look back at the <readme.md> file for some hints //
// working API key //

const giphyApiKey = "Y6BBlzt9L6ZPjlgYwf8qxDQbgCK33bAt";

const searchBtn = document.getElementById("searchBtn");
const removeBtn = document.getElementById("removeBtn");
const searchInput = document.getElementById("searchInput");
const imageContainer = document.getElementById("image-container");

// 🔍 Search Giphy by keyword
async function searchGifs() {
  const searchTerm = searchInput.value.trim();

  // If empty search → pull trending gifs
  const endpoint = searchTerm
    ? `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${searchTerm}&limit=10`
    : `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=20`;

  try {
    const response = await axios.get(endpoint);
    const gifs = response.data.data;

    imageContainer.innerHTML = ""; // Clear old images

    gifs.forEach((gif) => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url;
      img.alt = "GIF";
      imageContainer.appendChild(img);
    });
  } catch (error) {
    console.error("Error fetching GIFs:", error);
  }
}

// Remove all GIFs
function clearImages() {
  imageContainer.innerHTML = "";
}

// Add event listeners
searchBtn.addEventListener("click", searchGifs);
removeBtn.addEventListener("click", clearImages);



