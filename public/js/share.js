$.ajaxSetup({
  crosssDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

function initUI() {
  if(localStorage.user_id) {
    $('.login').addClass('hide');
    $('.login').removeClass('show');
    $('.logout').addClass('show');
    $('.logout').removeClass('hide');
  } else {
    $('.login').addClass('show');
    $('.login').removeClass('hide');
    $('.logout').addClass('hide');
    $('.logout').removeClass('show');
  }
}

const API_URL = getHostURL();
const AUTH_URL = `${API_URL}/auth`
const IMAGE_URL = `${API_URL}/images`

function getHostURL() {
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost:3000';
  } else {
    return 'https://sticker-mania.herokuapp.com';
  }
}

function showErrorMessage(message) {
  const $errorMessage = $('#error_message');
  $errorMessage.text(message);
  $errorMessage.removeClass('hide'); 
  $errorMessage.addClass('show'); 
}

function setIdRedirect(result) {
  localStorage.user_id = result.id;
  window.location = `/`;
}

function redirectIfLoggedIn() {
  if(localStorage.user_id) {
    window.location = `/`;
  }
}

$('.logout').on("click",function(){
  localStorage.removeItem('user_id');
  return $.get(`${AUTH_URL}/signout`)
  .then(result => {
      window.location = `/auth/signin`;
  });
})

function viewImageMap(id, file_name, user_id) {
  $('#view_part').removeClass('hide');
  $('#view_part').addClass('show');
  $('#location_image').attr('src', './imgs/'+ file_name);
  $('.thump').html('');
  $('.thump').append ('<span onclick="thumb(2, ' + id +', ' + user_id + ')"><i class="fa fa-thumbs-down"></i></span><span style="margin-left:10px" onclick="thumb(1, ' + id +', ' + user_id + ')"><i class="fa fa-thumbs-up"></i></span>');
}

function thumb(type, image_id, user_id) {
  if(type == 1){
    text = "Do you really Thumb Up?"
  } else {
    text = "Do you really Thumb Down?"
  }
  var r = confirm(text);
  if (r == true) {
    $.get(`${IMAGE_URL}/thumb/${type}/${image_id}/${user_id}`)
      .then(result => {
        alert(result.message);
      }).catch(error => {
          showErrorMessage(error.responseJSON.message);
      });
  } else {
     return false;
  } 
}

