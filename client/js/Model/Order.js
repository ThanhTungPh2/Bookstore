import {Users} from "./Users.js"

export class Order {

  constructor(element){
    this.id = element.id;
    this.userId = element.userId;
    this.name = element.name;
    this.number = element.number;
    this.email = element.email;
    this.method =  element.method;
    this.address =  element.address;
    this.note =  element.note;
    this.placedOn = element.placedOn;
    this.status =  element.status;
    this.carts = element.carts.product;
  }

  item() {
    const order_item = document.createElement("div");
    order_item.classList.add("order-item");

    const box_cart_detail = document.createElement("div");
    box_cart_detail.classList.add("box-cart-detail")

    const text_detail_1 = document.createElement("p");
    text_detail_1.classList.add("text-detail")
    text_detail_1.innerText = "Mã đơn hàng: "+ this.id;

    const text_detail_2 = document.createElement("p");
    text_detail_2.classList.add("text-detail")
    text_detail_2.innerText = "Ngày đặt hàng: "+this.placedOn;

    const text_detail_3 = document.createElement("p");
    text_detail_3.classList.add("text-detail")
    text_detail_3.innerText = "Trạng thái: "+this.status;

    box_cart_detail.appendChild(text_detail_1);
    box_cart_detail.appendChild(text_detail_2);
    box_cart_detail.appendChild(text_detail_3);

    const table = document.createElement("table");
    table.setAttribute("border", 1);
    table.id = "table-product-2";

    const tbody = document.createElement("tbody");

    const tr_1 = document.createElement("tr");
    const tr_td_1 = document.createElement("th");
    tr_td_1.innerHTML = "Bìa sách"
    const tr_td_2 = document.createElement("th");
    tr_td_2.innerHTML = "Tên sách"
    const tr_td_3 = document.createElement("th");
    tr_td_3.innerHTML = "Tác giả"
    const tr_td_4 = document.createElement("th");
    tr_td_4.innerHTML = "Giá"
    const tr_td_5 = document.createElement("th");
    tr_td_5.innerHTML = "Số lượng"
    const tr_td_6 = document.createElement("th");
    tr_td_6.innerHTML = "Tổng tiền";

    tbody.appendChild(tr_1);

    tr_1.appendChild(tr_td_1);
    tr_1.appendChild(tr_td_2);
    tr_1.appendChild(tr_td_3);
    tr_1.appendChild(tr_td_4);
    tr_1.appendChild(tr_td_5);
    tr_1.appendChild(tr_td_6);

    let sum_price = 0;
    this.carts.forEach(element => {
      const tr = document.createElement("tr");


      const img = document.createElement("img");
      img.setAttribute("src", "../uploaded_img/"+element.image);
      const tr_td_1 = document.createElement("td");
      tr_td_1.appendChild(img);
 
      const tr_td_2 = document.createElement("td");
      tr_td_2.innerHTML = element.name;
      const tr_td_3 = document.createElement("td");
      tr_td_3.innerHTML = element.author
      const tr_td_4 = document.createElement("td");
      tr_td_4.innerHTML = element.price
      const tr_td_5 = document.createElement("td");
      tr_td_5.innerHTML = element.quantity
      const tr_td_6 = document.createElement("td");
      tr_td_6.innerHTML = element.price*element.quantity;

      tr.appendChild(tr_td_1);
      tr.appendChild(tr_td_2);
      tr.appendChild(tr_td_3);
      tr.appendChild(tr_td_4);
      tr.appendChild(tr_td_5);
      tr.appendChild(tr_td_6);

      tbody.appendChild(tr);

      sum_price += element.price*element.quantity;
    });

    const tr_2 = document.createElement("tr");

    const tr_2_td = document.createElement("td");
    tr_2_td.setAttribute("colspan", 5);
    tr_2_td.style.textAlign = "right";
    tr_2_td.innerHTML = "<b>Thành tiền</b>"

    const tr_2_td_1 = document.createElement("td");
    tr_2_td_1.innerHTML = "<b>"+sum_price+" VND</b>"

    tr_2.appendChild(tr_2_td)
    tr_2.appendChild(tr_2_td_1)

    tbody.appendChild(tr_2)

    table.appendChild(tbody);
    order_item.appendChild(box_cart_detail);
    order_item.appendChild(table);
    return order_item;
  }
}

