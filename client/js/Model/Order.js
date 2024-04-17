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
  }

  item() {
    const order_item = document.createElement("div");
    order_item.classList.add("order-item");

    const box_cart_detail = document.createElement("div");
    box_cart_detail.classList.add("box-cart-detail")

    const text_detail_1 = document.createElement("p");
    text_detail_1.classList.add("text-detail")

    const text_detail_2 = document.createElement("p");
    text_detail_1.classList.add("text-detail")

    const text_detail_3 = document.createElement("p");
    text_detail_1.classList.add("text-detail")

    box_cart_detail.appendChild(text_detail_1);
    box_cart_detail.appendChild(text_detail_2);
    box_cart_detail.appendChild(text_detail_3);

  }
}
