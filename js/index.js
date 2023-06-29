document.querySelector("#advanced-search").addEventListener("click", (event)=> {
  event.preventDefault();
  const advancedSearch = document.querySelector(".advanced-search-div");

  if (advancedSearch.style.display != "block"){
    advancedSearch.style.display = "block";
  } else {
    advancedSearch.style.display = "none";
  }

});

document.querySelector(".close-search").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(".advanced-search-div").style.display = "none";

  
})