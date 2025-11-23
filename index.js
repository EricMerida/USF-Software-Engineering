// go to the spoonacular api, get random recipe //
// click a button ad display that recipe //
// the browser needs to display it //

const spoonacularAPIKEY = "31ca898d573b4d28b750df342b00b26a";

const button = document.getElementById('generate-button');
const displayDiv = document.getElementById('display-div');


button.addEventListener('click', function(){
    console.log("i clocked the button");
    getRandomRecipe();
});

async function getRandomRecipe(){
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${spoonacularAPIKEY}`);
    console.log(response);
    // create a  new <div>
    let newDiv = document.createElement('div');
    let h3 = document.createElement('h3');

    // set recipe title into the header
    h3.innerHTML = response.data.recipes[0].title;
    displayDiv.appendChild(h3);

    // set the recipe summary in the new div
    newDiv.innerHTML = response.data.recipes[0].summary;
    displayDiv.appendChild(newDiv);

}

