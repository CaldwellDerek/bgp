const options = {
    startingTop: "50%",
    endingTop: "20%",
    opacity: 0.7
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });
