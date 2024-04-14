import {Users} from "./Users.js"

export class Carts {
  
    constructor(element){
      this.userId = element.userId;
      this.orderId = element.orderId;
      this.listProducts = element.product;
    }
  
    item() {
        const box_container = document.createElement("div");
        box_container.classList.add("box-container")

        this.listProducts.forEach(k => {
            const box = document.createElement("div");
            box.classList.add("box")

            const a = document.createElement("a");
            a.href = ""
            a.classList.add("fas");
            a.classList.add("fa-times")
            a.addEventListener("click", function(e) {
              e.preventDefault();
              Carts.deleteCarts(Users.checkLoggedCookie().id, k.id);
              this.parentNode.removeChild(this);
            }.bind(box));

            const img = document.createElement("img");
            img.src = "../uploaded_img/"+k.image;

            const name = document.createElement("p");
            name.classList.add("name");
            name.innerText = k.name;

            const price = document.createElement("p");
            price.classList.add("price");
            price.innerText = k.price + " VND (SL: " + k.quantity + ")";

            const input = document.createElement("input");
            input.type = "number";
            input.value = k.quantity;

            const submit = document.createElement("input");
            submit.type = "button"
            submit.setAttribute("name","update_cart")
            submit.setAttribute("value", "Cập nhật");
            submit.classList.add("option-btn");


            box.appendChild(a);
            box.appendChild(img);
            box.appendChild(name);
            box.appendChild(price);
            box.appendChild(input);
            box.appendChild(submit);
            box_container.appendChild(box);
          });

        return box_container; 
    }
    static deleteCarts(user_id, product_id) {
      let dataform = {
        userId: user_id,
        productId: product_id
      }
      $.ajax({
        type: 'POST', // Phương thức gửi request
        url: 'http://localhost:8080/carts/delete', // Địa chỉ URL của endpoint server
        data: JSON.stringify(dataform), // Dữ liệu gửi đi
        dataType: 'json',
        contentType:"application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true // Thêm withCredentials vào XHR
        },
        success: function(response) {

          },
        error: function(xhr, status, error) {

        }
    });
    }
    static showCarts() {
        //Load sách theo các thể loại
        const cartsList = document.querySelector(".shopping-cart .box-container")
        cartsList.innerHTML = null;
        $.ajax({
           type: 'GET', // Phương thức gửi request
           url: 'http://localhost:8080/carts/'+Users.checkLoggedCookie().id, // Địa chỉ URL của endpoint server
           xhrFields: {
               withCredentials: true // Thêm withCredentials vào XHR
           },
           success: function(response) {
              let data = JSON.parse(response);
              console.log(response)
              cartsList.appendChild(new Carts(data).item())
           },
           error: function(xhr, status, error) {
              
           }
       });
  }
}

  Carts.showCarts();
  