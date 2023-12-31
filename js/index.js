const BGAID = "dgPmhIgzGb"
const YTID = "AIzaSyBDsfH-p60RH4HGaZ8FKWozhjZW7LCA_CY"

// Displays random game on page load
window.addEventListener("DOMContentLoaded", async () => {
  await bgaSearch(`https://api.boardgameatlas.com/api/search?random=true&client_id=${BGAID}`);
  setTimeout(()=>{
    document.querySelector("body").style.overflowY = "scroll";
    document.querySelector(".page-load").style.display = "none";
  }, 1000)  
});

// Queries youtube for boardgame tutorial and updates embedded yt video
const populateYTVideo = async (gameName) => {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YTID}&type=video&part=snippet&maxResults=1&q=${"how to play the boardgame: " + gameName}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const jsonData = await response.json();

  document.querySelector("iframe").src = `https://www.youtube.com/embed/${jsonData.items[0].id.videoId}`
}

// Queries the API and updates DOM with main and similar game info
const bgaSearch = async (url) => {
  document.querySelector(".page-load").style.display = "block";
  document.querySelector("body").style.overflowY = "hidden";
  document.querySelector(".game-info-buttons").style.visibility = "hidden";
  const response = await fetch(url)
  const jsonData = await response.json();
  console.log(jsonData);
  
  if (jsonData.games.length <= 0){
    updateGameInfo(
      "./images/placeholder.jpg",
      "NO GAMES FOUND",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "No game was found with the current search criteria, please adjust and try again."
    );
    document.querySelector("#player").src="";
  } else {
    updateGameInfo(
      jsonData.games[0].images.large,
      jsonData.games[0].name,
      jsonData.games[0].players,
      jsonData.games[0].playtime,
      `${jsonData.games[0].min_age}+`,
      jsonData.games[0].primary_publisher.name,
      jsonData.games[0].year_published,
      jsonData.games[0].description
      
    );
    populateYTVideo(document.querySelector("#main-game-title").textContent)
    
    document.querySelector(".purchase-link").href = jsonData.games[0].url;

    for (let similarGame of document.querySelectorAll(".similar-game")){
      similarGame.remove();
    }

    for (let index = 1; index < jsonData.games.length; index++){
      let game = document.createElement('div');
      game.classList.add("similar-game");
      game.innerHTML = createSimGame(
        jsonData.games[index].images.large,
        jsonData.games[index].name,
        jsonData.games[index].description,
        jsonData.games[index].id
      );
      createListener(game.querySelector(".view-more"));
      document.querySelector(".similar-games-list").append(game);
    }

    document.querySelector(".game-info-buttons").style.visibility = "visible";
  }

  setTimeout(()=>{
    document.querySelector(".page-load").style.display = "none";
    document.querySelector("body").style.overflowY = "scroll";
  }, 1000)

}

// Uses parameters to update DOM with values
const updateGameInfo = (src, title, numPlayers, playtime, ages, publisher, yearPublished, description) => {
  document.querySelector("#main-game-image").src = src;
  document.querySelector("#main-game-title").innerHTML = title;
  document.querySelector("#main-game-players").innerHTML = `<img src="./images/number-of-players.png" alt="number of players">${numPlayers}`;
  document.querySelector("#main-game-time").innerHTML = `<img src="./images/play-time.png" alt="play time">${playtime}`;
  document.querySelector("#main-game-ages").innerHTML = `<img src="./images/age-group.png" alt="age group">${ages}`;
  document.querySelector("#main-game-publisher").innerHTML = publisher;
  document.querySelector("#main-game-year").innerHTML = yearPublished;
  document.querySelector("#main-game-description").innerHTML = description;
}

// Uses params to create the similar game elements for DOM
const createSimGame = (src, title, description, gameId) => {
  const similarGame = 
    `
      <div class="similar-game-image">
        <img src="${src}" alt="placeholder">
      </div>
      <div class="similar-game-info">
        <h3>${title}</h3>
        <div>${description}</div>
        <button data-id="${gameId}" class="view-more btn" type="button">View More</button>
      </div>
    `
  return similarGame;
}

// Creates event listener on View More buttons to populate main game information section
const createListener = (element) => {
  element.addEventListener("click", async () => {
    const response = await fetch(`https://api.boardgameatlas.com/api/search?ids=${element.getAttribute("data-id")}&client_id=${BGAID}`)
    const jsonData = await response.json();
    updateGameInfo(
      jsonData.games[0].images.large,
      jsonData.games[0].name,
      jsonData.games[0].players,
      jsonData.games[0].playtime,
      `${jsonData.games[0].min_age}+`,
      jsonData.games[0].primary_publisher.name,
      jsonData.games[0].year_published,
      jsonData.games[0].description
    );
    populateYTVideo(jsonData.games[0].name);
    document.querySelector(".purchase-link").href = jsonData.games[0].url;
    window.location.href = "#top";
    document.query
  });
}

// Retrieves all values from input fields and returns an API url
const getInputVals = () => {
  const searchParams = [];
  for (let input of document.querySelectorAll("input")){
    searchParams.push(input.value);
  }
   return `https://api.boardgameatlas.com/api/search?limit=5&name=${searchParams[0]}&publisher=${searchParams[1]}&year_published=${searchParams[2]}&min_players=${searchParams[3]}&min_age=${searchParams[4]}&min_playtime=${searchParams[5]}&client_id=${BGAID}`;
  
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
  button.addEventListener("click", async () => {
    await bgaSearch(getInputVals());
    hideAdvSearch();
    document.querySelector(".similar-games-list").style.display = "block";
  })
}
