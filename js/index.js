// Activates and Closes advanced search options 
function removeSlidedown() {
  document.querySelector("body").classList.remove("slidedown");
  document.querySelector("body").style.gridTemplateRows = "22rem 26rem auto auto 5rem"
  document.querySelector(".advanced-search-container").style.opacity = "1";
  document.querySelector(".advanced-search-container").style.visibility = "visible";
}

function removeSlideup() {
  document.querySelector("body").classList.remove("slideup");
  document.querySelector("body").style.gridTemplateRows = "22rem 0rem auto auto 5rem"
  removeStyle();
}

function removeStyle() {
  document.querySelector(".advanced-search-container").style.opacity = "0";
  document.querySelector(".advanced-search-container").style.visibility = "hidden";
}

document.querySelector("#advanced-search").addEventListener("click", () => {
  // const body = document.querySelector("body");
  // const advSearchContainer = document.querySelector(".advanced-search-container");

  // function removeSlidedown() {
  //   body.classList.remove("slidedown");
  //   body.style.gridTemplateRows = "22rem 26rem auto auto 5rem"
  //   advSearchContainer.style.opacity = "1";
  //   advSearchContainer.style.visibility = "visible";
  // }

  // function removeSlideup() {
  //   body.classList.remove("slideup");
  //   body.style.gridTemplateRows = "22rem 0rem auto auto 5rem"
  //   removeStyle();
  // }

  // function removeStyle() {
  //   advSearchContainer.style.opacity = "0";
  //   advSearchContainer.style.visibility = "hidden";
  // }

  if (document.querySelector("body").getAttribute("data-trigger") == "down"){
     document.querySelector(".advanced-search-container").style.display = "grid";
    document.querySelector("body").classList.add("slidedown");
    document.querySelector("body").addEventListener("animationend", removeSlidedown);
    document.querySelector("body").setAttribute("data-trigger", "up");
  } else {
    document.querySelector("body").classList.add("slideup");
    document.querySelector("body").addEventListener("animationstart", removeStyle);
    document.querySelector("body").addEventListener("animationend", removeSlideup);
    document.querySelector("body").setAttribute("data-trigger", "down");
    document.querySelector(".advanced-search-container").style.display = "none";
  }

});

document.querySelector(".close-search").addEventListener("click", ()=> {
  const body = document.querySelector("body");
  const advSearchContainer = document.querySelector(".advanced-search-container");

  // function removeSlideup() {
  //   body.classList.remove("slideup");
  //   body.style.gridTemplateRows = "22rem 0rem auto auto 5rem"
  //   removeStyle();
  // }

  // function removeStyle() {
  //   advSearchContainer.style.opacity = "0";
  //   advSearchContainer.style.visibility = "hidden";
  // }

  body.classList.add("slideup");
  body.addEventListener("animationstart", removeStyle);
  body.addEventListener("animationend", removeSlideup);
  body.setAttribute("data-trigger", "down");
  advSearchContainer.style.display = "none";
})
