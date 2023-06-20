const modalOptions = {
    startingTop: "50%",
    endingTop: "20%",
    opacity: 0.7
};

const collapsibleOptions = {
    accordion: false
};

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, modalOptions);
  });


  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelector('.collapsible');
    var instances = M.Collapsible.init(elems, collapsibleOptions);
  });