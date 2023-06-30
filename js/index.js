document.querySelector("#advanced-search").addEventListener("click", () => {
  const body = document.querySelector("body");
  const advSearchContainer = document.querySelector(".advanced-search-container");

  if (body.getAttribute("data-height") == "0"){
    body.setAttribute("data-height", "1");
    body.classList.add("slidedown");
    advSearchContainer.classList.add("appear");
  } else {
    body.setAttribute("data-height", "0");
    advSearchContainer.classList.add("disappear");
    body.classList.add("slideup");
  }

  body.addEventListener("animationend", () => {
    if (body.getAttribute("data-height") == "1"){
      body.classList.remove("slidedown");
      body.style.gridTemplateRows =  "22rem 26rem auto auto 5rem";
    } else {
      body.classList.remove("slideup");
      body.style.gridTemplateRows =  "22rem 0rem auto auto 5rem";
    }
  })

  advSearchContainer.addEventListener("animationend", () => {
    if (body.getAttribute("data-height") == "1"){
      advSearchContainer.classList.remove("appear");
      advSearchContainer.style.visibility = "visible";
      advSearchContainer.style.opacity = "1";
    } else {
      advSearchContainer.classList.remove("disappear");
      advSearchContainer.style.visibility = "hidden";
      advSearchContainer.style.opacity = "0";
    }
  })


});
