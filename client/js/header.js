let userBox = document.querySelector('.header .header-2 .user-box');

document.querySelector('#user-btn').onclick = () =>{
userBox.classList.toggle('active');
navbar.classList.remove('active');
}

let navbar = document.querySelector('.header .header-2 .navbar');

document.querySelector('#menu-btn').onclick = () =>{
navbar.classList.toggle('active');
userBox.classList.remove('active');
}

window.onscroll = () =>{
    userBox.classList.remove('active');
    navbar.classList.remove('active');

    if(window.scrollY > 60){
        document.querySelector('.header .header-2').classList.add('active');
    }else{
        document.querySelector('.header .header-2').classList.remove('active');
    }
}
$('.register').hide();
$('.login').hide();
$('#cart').hide();
$('#user-btn').hide();
// checkLogin
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
function checkLoggedCookie() {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf("logged=") === 0) {
            return JSON.parse(b64DecodeUnicode(cookie.substring(7)));
        }
    }
    return false;
}

// Sử dụng hàm checkLoggedCookie() để kiểm tra
var infor = checkLoggedCookie()
if (infor) {
    $('#cart').show();
    $('#name-user').html(infor.name);
    $('#email-user').html(infor.email);
    $('#user-btn').show();
    
} else {
    $('.register').show();
    $('.login').show();
}
