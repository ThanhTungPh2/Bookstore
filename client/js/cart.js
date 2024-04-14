import { Carts } from "./Model/Carts.js";
import { Users } from "./Model/Users.js";

$(document).ready(function() {
   //Load sách theo các thể loại
   const cartsList = document.querySelector(".shopping-cart .box-container")
   $.ajax({
      type: 'GET', // Phương thức gửi request
      url: 'http://localhost:8080/carts/'+Users.checkLoggedCookie().id, // Địa chỉ URL của endpoint server
      xhrFields: {
          withCredentials: true // Thêm withCredentials vào XHR
      },
      success: function(response) {
         let data = JSON.parse(response);
         console.log(data.product)
         cartsList.appendChild(new Carts(data).item())
      },
      error: function(xhr, status, error) {
         
      }
  });
})