import { Product } from "./Model/Products.js";

import { Category } from "./Model/Category.js";

$(document).ready(function() {

   //Load product và sách mới nhất
   const productNew = document.getElementById('new products');
   $.get('http://localhost:8080/products/all', function(data) {
      data.slice(-4).forEach(element => {
         productNew.appendChild(new Product(element).item());
      });
   })

   //Load sách theo các thể loại
   const categoryList = document.getElementById("category_list")
   $.get("http://localhost:8080/category/all", function(data) {
      data.slice(1,4).forEach(element => {  
         $.get('http://localhost:8080/products/byCategory?category_id='+element['id'], function(data2) {
            categoryList.appendChild(new Category(element,data2.slice(0,8)).item())      
         })
      })
   })
   // Ẩn tin nhắn
   $('.message').hide();
   $('.message i').click(function() { $(".message").hide() })
})


