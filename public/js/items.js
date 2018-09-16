
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
  });



  $(document).on('click','.item-details', function() {
    const itemId = this.id
    const currPath = window.location.pathname;

    $.ajax({
        method: 'GET',
        url: `${currPath}/${itemId}`
    })
})