import { Product } from "./Model/Products.js";

import { Category } from "./Model/Category.js";

//Load product và sách mới nhất
const productNew = document.getElementById('new products');
$.get('http://localhost:8080/products/all', function(data) {
   data.slice(-4).forEach(element => {
      productNew.appendChild(new Product(element).item());
   });
})

//Load sách theo các thể loại
const categoryList = document.getElementById("category_list")
$.get("http://localhost:8080/category", function(data) {
   data.forEach(element => {  
      $.get('http://localhost:8080/products/byCategory?category_id='+element['id'], function(data2) {
         categoryList.appendChild(new Category(element,data2).item())      
      })
   })
})



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

$.get('http://localhost:8080/products/byCategory?category_id=1', function(data) {
   console.log(data)
})

