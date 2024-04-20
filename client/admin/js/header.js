import { Users } from "../../js/Model/Users.js";

let navbar = document.querySelector('.header .navbar');
let accountBox = document.querySelector('.header .account-box');

document.querySelector('#menu-btn').onclick = () =>{
   navbar.classList.toggle('active');
   accountBox.classList.remove('active');
}

document.querySelector('#user-btn').onclick = () =>{
   var infor = Users.checkLoggedCookie()
   $('#name-user').html(infor.name);
   $('#email-user').html(infor.email);
   
   accountBox.classList.toggle('active');
   navbar.classList.remove('active');
}

window.onscroll = () =>{
   navbar.classList.remove('active');
   accountBox.classList.remove('active');
}

document.querySelector('#close-update').onclick = () =>{
   document.querySelector('.edit-product-form').style.display = 'none';
   window.location.href = 'admin_products.php';
}

$("#logout_btn").on("click", function() {
   $.ajax({
       type: 'GET', // Phương thức gửi request
       url: 'http://localhost:8080/api/v1/auth/logout', // Địa chỉ URL của endpoint server
       xhrFields: {
           withCredentials: true // Thêm withCredentials vào XHR
       },
       success: function(response) {
         window.location.href = "../../html/index.html"
       },
   });
})