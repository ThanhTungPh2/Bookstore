import { Product } from "./Model/Products.js";
import { Fetch } from "../js/Fetch.js";
import { Category } from "./Model/Category.js";

//Load product và sách mới nhất
const productNew = document.getElementById('new products');
let dataProduct = await Fetch.fetchGet('http://localhost:8080/products')
dataProduct.slice(-4).forEach(element => {
   productNew.appendChild(new Product(element).item());
});

//Load sách theo các thể loại
const categoryList = document.getElementById("category_list")
let dataCategory = await Fetch.fetchGet('http://localhost:8080/category')
dataCategory.forEach(element => {
   let list_product = [];
   dataProduct.filter(data => data.categoryId == element.id ).forEach(e => {
      list_product.push(new Product(e))
   })
   categoryList.appendChild(new Category(element,list_product).item());
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


