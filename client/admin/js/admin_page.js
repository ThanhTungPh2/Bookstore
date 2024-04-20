import { Users } from "../../js/Model/Users.js";

const orders = document.getElementById("orders");
const product = document.getElementById("product");
const users = document.getElementById("users");
const admins = document.getElementById("admin");
$.ajax({
    type: 'GET', // Phương thức gửi request
    url: 'http://localhost:8080/orders/All', // Địa chỉ URL của endpoint server
    xhrFields: {
        withCredentials: true // Thêm withCredentials vào XHR
    },
    success: function(response) {
      orders.innerText = response.length;
      response.forEach(element => {
        
      });
    },
});

//Load product và sách mới nhất
$.get('http://localhost:8080/products/all', function(data) {
  product.innerText = data.length
})

$.ajax({
  type: 'GET', // Phương thức gửi request
  url: 'http://localhost:8080/users/USER', // Địa chỉ URL của endpoint server
  xhrFields: {
      withCredentials: true // Thêm withCredentials vào XHR
  },
  success: function(response) {
    users.innerText = response.length
  },
});

$.ajax({
  type: 'GET', // Phương thức gửi request
  url: 'http://localhost:8080/users/ADMIN', // Địa chỉ URL của endpoint server
  xhrFields: {
      withCredentials: true // Thêm withCredentials vào XHR
  },
  success: function(response) {
    admins.innerText = response.length
  },
});