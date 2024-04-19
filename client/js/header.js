import {Users} from "./Model/Users.js"

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
$('.message').hide()

// Sử dụng hàm checkLoggedCookie() để kiểm tra
var infor = Users.checkLoggedCookie()
if (infor) {
    $('#cart').show();
    $('#name-user').html(infor.name);
    $('#email-user').html(infor.email);
    $('#user-btn').show();
    
} else {
    $('.register').show();
    $('.login').show();
}

$("#logout_btn").on("click", function() {
    $.ajax({
        type: 'GET', // Phương thức gửi request
        url: 'http://localhost:8080/api/v1/auth/logout', // Địa chỉ URL của endpoint server
        xhrFields: {
            withCredentials: true // Thêm withCredentials vào XHR
        },
        success: function(response) {

        },
    });
})
