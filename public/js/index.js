function viewUploadResult(message){
    if(message){
        alert(message);
    }
}

$(() => {
    $('#view_images').click((event) => {
        event.preventDefault();
        const view_latitude =$('#view_latitude').val();
        const view_longitude =$('#view_longitude').val();
        const position = {
            lat: view_latitude,
            lng: view_longitude
        };

        getImages(position)
            .then(result => {
                if(result) {
                    images = result.images[0];
                    $('#image_box').html('');
                    $('#image_box').append("<img  style='width:280px' src='./imgs/" + images['file_name'] + "'>");
                }
            }).catch(error => {
                showErrorMessage(error.responseJSON.message);
            });
    });
});

function getImages(position) {
    var images =   $.get(`${IMAGE_URL}/get_images/${position.lat}/${position.lng}`);
    return images;
}

function getAllImages(){
    var images =  $.get(`${IMAGE_URL}/get_all_images`);
    return images;
}

function drawUserRating(rating){
    var emptyCount = 0;
    var halfCount = false;
    var fullCount = 0;
    if(rating == 0) {
        emptyCount = 10;
    } else {
        var fullCount = Math.floor(rating / 3);
        if(rating % 3) {
            halfCount = true;
        }
        var emptyCount = 10 - fullCount - halfCount;
    }
    
    var html = '';
    for(i=0; i < fullCount; i++) {
        html += '<i class="fa fa-star"></i>';
    }
    if(halfCount) {
        html += '<i class="fa fa-star-half-empty"></i>';
    }
    for(i=0; i < emptyCount; i++) {
        html += '<i class="fa fa-star-o">';
    }
    $('#stars').html(html);
}