const CLIENTID1 = "dgPmhIgzGb"

// Uses parameters to update DOM with values
const updateGameInfo = (src, title, numPlayers, playtime, ages, publisher, yearPublished, description) => {
  document.querySelector("#main-game-image").src = src;
  document.querySelector("#main-game-title").innerHTML = title;
  document.querySelector("#main-game-players").innerHTML = `<img src="./images/number-of-players.png" alt="number of players">${numPlayers}`;
  document.querySelector("#main-game-time").innerHTML = `<img src="./images/play-time.png" alt="play time">${playtime}`;
  document.querySelector("#main-game-ages").innerHTML = `<img src="./images/age-group.png" alt="age group">${playtime}`;
  document.querySelector("#main-game-publisher").innerHTML = publisher;
  document.querySelector("#main-game-year").innerHTML = yearPublished;
  document.querySelector("#main-game-description").innerHTML = description;
}

// Queries the API
const bgaSearch = async (url) => {
  const response = await fetch(url)
  const jsonData = await response.json();
  console.log(jsonData);
  
  updateGameInfo(
    jsonData.games[0].images.large,
    jsonData.games[0].name,
    jsonData.games[0].players,
    jsonData.games[0].playtime,
    `${jsonData.games[0].min_age}+`,
    jsonData.games[0].primary_publisher.name,
    jsonData.games[0].year_published,
    jsonData.games[0].description_preview
  );
}

// Retrieves all values from input fields and returns an API url
const getInputVals = () => {
  const searchParams = [];
  for (let input of document.querySelectorAll("input")){
    searchParams.push(input.value);
  }
  const apiURL = `https://api.boardgameatlas.com/api/search?limit=1&name=${searchParams[0]}&publisher=${searchParams[1]}&year_published=${searchParams[2]}&min_players=${searchParams[3]}&min_age=${searchParams[4]}&min_playtime=${searchParams[5]}&client_id=${CLIENTID1}`
  return apiURL;
}

// Removes slide down animation on advanced search bar
const rmvSD = () => {
  document.querySelector("body").classList.remove("slidedown");
  document.querySelector("body").style.gridTemplateRows = "22rem 26rem auto auto 5rem"
  document.querySelector(".advanced-search-container").style.opacity = "1";
  document.querySelector(".advanced-search-container").style.visibility = "visible";
}

// Removes slide up animation on advanced search bar
const rmvSU = () => {
  document.querySelector("body").classList.remove("slideup");
  document.querySelector("body").style.gridTemplateRows = "22rem 0rem auto auto 5rem"
  rmvAdvStyle();
}

// Removes styling on advanced search container
const rmvAdvStyle = () => {
  document.querySelector(".advanced-search-container").style.opacity = "0";
  document.querySelector(".advanced-search-container").style.visibility = "hidden";
}

// Runs animation to show advanced search bar
const showAdvSearch = () => {
  document.querySelector(".advanced-search-container").style.display = "grid";
  document.querySelector("body").classList.add("slidedown");
  document.querySelector("body").addEventListener("animationend", () => rmvSD());
  document.querySelector("body").setAttribute("data-trigger", "up");
}

// Runs animation to close advanced search bar, removes values from input fields
const hideAdvSearch = () => {
  document.querySelector("body").classList.add("slideup");
  document.querySelector("body").addEventListener("animationstart", () => rmvAdvStyle());
  document.querySelector("body").addEventListener("animationend", () => rmvSU());
  document.querySelector("body").setAttribute("data-trigger", "down");
  document.querySelector(".advanced-search-container").style.display = "none";
  rmvIVals();
}

// Removes values from adv search input fields
const rmvIVals = () => {
  for (let input of document.getElementsByClassName("advanced-search")){
    input.value = "";
  }
}

// "Advanced Search" button shows / closes advanced search options 
document.querySelector("#advanced-search").addEventListener("click", () => {
  if (document.querySelector("body").getAttribute("data-trigger") == "down"){
    showAdvSearch();
  } else {
    hideAdvSearch();
  }
});

// "Cancel" button closes advanced search options
document.querySelector(".close-search").addEventListener("click", () => {
  hideAdvSearch();
})

// Adds event listener to both search buttons and queries the API
for(let button of document.querySelectorAll(".search-btn")){
  button.addEventListener("click", () => {
    bgaSearch(getInputVals());
  })
}
