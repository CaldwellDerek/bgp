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

// "Cancel" button hides closes advanced search options
document.querySelector(".close-search").addEventListener("click", () => {
  hideAdvSearch();
})