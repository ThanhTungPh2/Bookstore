import { Product } from "./Products.js";

export class Category {
    
  constructor(element, listProduct) {
    this.element = element;
    this.listProduct = listProduct;
  }

    item() {
        const category = document.createElement("section");
        category.classList.add("show_category");

        const corlor_box = document.createElement("div");
        corlor_box.classList.add("color_box");

        const title = document.createElement("h2");
        title.classList.add("title_category");
        title.innerHTML = this.element.name;

        const box = document.createElement('div');
        box.classList.add('box-container');

        this.listProduct.forEach(k => {
          box.appendChild(new Product(k).item());
        });

        const load_more = document.createElement('div');
        load_more.classList.add('load-more');

        const link = document.createElement('a');
        link.classList.add('option-btn');
        link.innerHTML = 'Xem thêm...';
        link.setAttribute('href',``);
        load_more.appendChild(link);

        corlor_box.appendChild(title);
        corlor_box.appendChild(box);
        corlor_box.appendChild(load_more);
        category.appendChild(corlor_box);

        return category;
    }
}