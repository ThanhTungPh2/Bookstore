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
        
        data.reverse().forEach(element => {
            cart_detail.appendChild(new Order(element).item());
        });
        console.log(data)
        if (!data || data.length === 0) {
            cart_detail.innerHTML = "<p class=\"empty empty-card\">Bạn chưa từng mua hàng!</p>";
        }        
        
      },
      error: function(xhr, status, error) {
        cart_detail.innerHTML = "<p class=\"empty empty-card\">Bạn chưa từng mua hàng!</p>"
      }
  });