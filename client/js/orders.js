import { Order } from "./Model/Order.js";
import { Users } from "./Model/Users.js";

const cart_detail = document.querySelector(".cart-detail");
$.ajax({
      type: 'GET', // Phương thức gửi request
      url: 'http://localhost:8080/orders/All/'+Users.checkLoggedCookie().id, // Địa chỉ URL của endpoint server
      xhrFields: {
          withCredentials: true // Thêm withCredentials vào XHR
      },
      success: function(response) {
        const data = JSON.parse(response);
        
        data.forEach(element => {
            cart_detail.appendChild(new Order(element).item());
        });
        console.log(data)
        if (data)
            cart_detail.innerHTML = "<p class=\"empty empty-card\">Giỏ hàng của bạn trống!</p>"
        
      },
      error: function(xhr, status, error) {
      }
  });