function checkLoggedCookie() {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.indexOf("logged=") === 0) {
            return true;
        }
    }
    return false;
}

//Check login
if (checkLoggedCookie()) {
    $('.register').hide();
    $('.login').hide();
    $('#cart').show();
    $('#user-btn').show();
} else {
    $('.register').show();
    $('.login').show();
    $('#cart').hide();
    $('#user-btn').hide();
}
// $.ajax({
//     type: 'GET', // Phương thức gửi request
//     url: 'http://localhost:8080/api/v1/auth/logout', // Địa chỉ URL của endpoint server
//     xhrFields: {
//         withCredentials: true // Thêm withCredentials vào XHR
//     },
//     success: function(response) {

//     },
// });
