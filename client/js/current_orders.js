import { Order } from "./Model/Order.js";
import { Users } from "./Model/Users.js";

const cart_detail = document.querySelector(".cart-detail");
$.ajax({
      type: 'GET', // Phương thức gửi request
      url: 'http://localhost:8080/orders/All2/'+Users.checkLoggedCookie().id, // Địa chỉ URL của endpoint server
      xhrFields: {
          withCredentials: true // Thêm withCredentials vào XHR
      },
      success: function(response) {
        const data = JSON.parse(response);
        const filteredData = data.filter(item => item.status !== "Hoàn thành" && item.status !== "Carts");

        console.log(filteredData)
        
        filteredData.reverse().forEach(element => {
            cart_detail.appendChild(new Order(element).item());
        });
        console.log(filteredData)
        if (!filteredData || filteredData.length === 0) {
            cart_detail.innerHTML = "<p class=\"empty empty-card\">Không có đơn hàng nào!</p>";
        }        
        
      },
      error: function(xhr, status, error) {
      }
  });