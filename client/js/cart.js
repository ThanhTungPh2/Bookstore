import { Carts } from "./Model/Carts.js";

//Load sách theo các thể loại
const cartsList = document.getElementById("shopping-cart")
$.get("http://localhost:8080/orders/All/"+infor.id, function(data) {
   data.forEach(element => {  
          console.log(element) 
      })
   })