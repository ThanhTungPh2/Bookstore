export class Product {
  
  constructor(element){
    this.id = element.id;
    this.name = element.name;
    this.price = element.price;
    this.author = element.author;
    this.discount = element.discount
    this.newPrice = element.newPrice;
    this.category_id = element.category_id;
    this.quantity = element.quantity;
    this.describes = element.describes;
    this.image = element.image;
  }

  item() {
    const productForm = document.createElement('form');
    productForm.setAttribute('action', '');
    productForm.setAttribute('method', '');
    productForm.classList.add('box');

    // Ảnh
    const productLink = document.createElement('a');
    const productImage = document.createElement('img');
    productImage.classList.add('image');
    productImage.setAttribute('src', `../uploaded_img/`+ this.image);
    productImage.setAttribute('alt', '');
    productImage.setAttribute("value", this.id);
    productImage.addEventListener("click", function(data) {
      sessionStorage.setItem("product_details_id",this.getAttribute("value"))
      window.location.href = "../html/product_details.html"
    })

    //Tên
    const productLink_2 = document.createElement('a');
    productLink_2.setAttribute('href', ``);
    const productName = document.createElement('div');
    productName.classList.add('name');
    productLink_2.innerHTML = this.name;

    //Giá
    const productPrice = document.createElement('div');
    productPrice.classList.add('price');
    productPrice.innerHTML = this.newPrice + ' VND / ';
    const oldprice = document.createElement('span');
    oldprice.classList.add('old-price');
    oldprice.innerHTML = this.price + 'VND';
    productPrice.appendChild(oldprice);

    const productQuantityInput = document.createElement('input');
    productQuantityInput.setAttribute('type', 'hidden');
    productQuantityInput.setAttribute('name', 'quantity');

    const productIdInput = document.createElement('input');
    productIdInput.setAttribute('type', 'hidden');
    productIdInput.setAttribute('name', 'product_id');
    productIdInput.setAttribute('value', this.id);

    const productPriceInput = document.createElement('input');
    productPriceInput.setAttribute('type', 'hidden');
    productPriceInput.setAttribute('name', 'product_price');
    productPriceInput.setAttribute('value', this.newPrice);

    const addToCartButton = document.createElement('input');
    addToCartButton.setAttribute('type', 'submit');
    addToCartButton.setAttribute('value', 'Thêm vào giỏ hàng');
    addToCartButton.setAttribute('name', 'add_to_cart');
    addToCartButton.setAttribute("product_id", this.id)
    addToCartButton.setAttribute("product_qty", this.quantity)
    addToCartButton.classList.add('btn');

    // Thêm các phần tử con vào form
    productForm.appendChild(productLink);
    productLink.appendChild(productImage);
    productName.appendChild(productLink_2)
    productForm.appendChild(productName);
    productForm.appendChild(productPrice);
    productForm.appendChild(productQuantityInput);
    productForm.appendChild(productIdInput);
    productForm.appendChild(productPriceInput);
    productForm.appendChild(addToCartButton);

    // Thêm form vào container
    return productForm;
  }

  
}
