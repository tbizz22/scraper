


const options = {
    direction: 'right',
    hoverEnabled: true
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, options);
});

$('#textarea1').val();
M.textareaAutoResize($('#textarea1'));



$('#submit').on('click', function () {
    event.preventDefault();

    const urlParam = window.location.href.split('\/')
    const commentBody = $('#textarea1').val()
    console.log(urlParam)


    const comment = {
        userId: urlParam[4],
        itemId: urlParam[5],
        commentBody: commentBody
    }

    $.ajax({
        method: 'POST',
        url: `/home/${comment.userId}/${comment.itemId}`,
        data: comment,
        success: function() {
            location.reload()
        }
    })
})

$('.saveItem').on('click', function() {
    event.preventDefault();
    const urlParam = window.location.href.split('\/');
    console.log(this.id)

    const itemClicked = urlParam[5];
    const userSaving = urlParam[4]

    const saveArticleObjSend = {
        userId: userSaving,
        itemId: itemClicked
    };

    $.ajax({
        method: 'POST',
        url: `/home/${saveArticleObjSend.userId}/${saveArticleObjSend.itemId}/saveArticle`,
        data: saveArticleObjSend,
        success: function() {
           location.reload();
        }
    })
})