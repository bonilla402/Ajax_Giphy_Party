async function RetrieveGif()
{
    let searchInput = document.getElementById("SearchInput");    

    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          q: searchInput.value,
          api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
      });

    searchInput.value = '';

    let numResults = response.data.data.length;
    let randomIdx = Math.floor(Math.random() * numResults);

    return response.data.data[randomIdx].images.fixed_height.url;
}

function createImage(gifURL)
{
    const GifContainer = document.getElementById("GifContainer");    

    /*Create Frame*/
    const GifFrame = document.createElement('div');
    GifFrame.classList.add("GifBox");

    /*Create Image*/
    var GifImage = new Image();
    GifImage.src = gifURL;   

    GifFrame.appendChild(GifImage);    
    GifContainer.appendChild(GifFrame);
}

async function AddGif(evt)
{
    evt.preventDefault();
    const gifUrl = await RetrieveGif();
    createImage(gifUrl);
}

async function RemoveGifs()
{
    const GifContainer = document.getElementById("GifContainer");    
    const gifs = [...GifContainer.querySelectorAll('div')];
    
    gifs.forEach(element => {
        element.remove();
    });

}

const form = document.getElementById("SearchForm");
form.addEventListener('submit', AddGif);

const removeButton = document.getElementById("RemoveButton");
removeButton.addEventListener('click', RemoveGifs);