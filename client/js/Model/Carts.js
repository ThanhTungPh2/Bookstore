export class Carts {
  
    constructor(element, listProducts){
      this.id = element.id;
      this.userId = element.userId;
      this.listProducts = listProducts;
    }
  
    item() {
        const box_container = document.createElement("div");
        box_container.classList.add("box-container")

        const box = document.createElement("div");
        box.classList.add("box")

        const a = document.createElement("a");
        a.href = ""
        a.classList.add("fas fa-times")

        const img = document.createElement("img");
        img.src = this.listProducts

        const name = document.createElement("p");
        name.classList.add("name");

        const price = document.createElement("p");
        price.classList.add("price");

        const input = document.createElement("input");
        input.type("number");

        box.appendChild(a);
        box.appendChild(img);
        box.appendChild(name);
        box.appendChild(price);
        box.appendChild(input);
        box_container.appendChild(box);

        return box_container; 
    }
  }
  