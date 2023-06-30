// Activates and Closes advanced search options 
document.querySelector("#advanced-search").addEventListener("click", () => {
  const body = document.querySelector("body");
  const advSearchContainer = document.querySelector(".advanced-search-container");

  function removeSlidedown() {
    body.classList.remove("slidedown");
    body.style.gridTemplateRows = "22rem 26rem auto auto 5rem"
    advSearchContainer.style.opacity = "1";
    advSearchContainer.style.visibility = "visible";
  }

  function removeSlideup() {
    body.classList.remove("slideup");
    body.style.gridTemplateRows = "22rem 0rem auto auto 5rem"
    removeStyle();
  }

  function removeStyle() {
    advSearchContainer.style.opacity = "0";
    advSearchContainer.style.visibility = "hidden";
  }

  if (body.getAttribute("data-trigger") == "down"){
    advSearchContainer.style.display = "grid";
    body.classList.add("slidedown");
    body.addEventListener("animationend", removeSlidedown);
    body.setAttribute("data-trigger", "up");
  } else {
    body.classList.add("slideup");
    body.addEventListener("animationstart", removeStyle);
    body.addEventListener("animationend", removeSlideup);
    body.setAttribute("data-trigger", "down");
    advSearchContainer.style.display = "none";
  }

});
