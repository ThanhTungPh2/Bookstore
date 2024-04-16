import {Product} from "./Model/Products.js"

//Load product và sách mới nhất
const productNew = document.getElementById('listBook');
const sort_box = document.querySelector(".sort-box");

//Load product và sách mới nhất
$.get('http://localhost:8080/products/all', function(data) {
   data.forEach(element => {
      productNew.appendChild(new Product(element).item());
   });
})

sort_box.addEventListener("change", function() {
    $.get('http://localhost:8080/products/all', function(data) {
        productNew.innerHTML = null;
        generateProducts(data,sort_box.value);
    })
})

function generateProducts(data, sortType = '2') {
    // Tạo một bản sao của mảng trước khi sắp xếp
    let temp = data.slice();
    switch (sortType) {
        case '1':
            // Đảo ngược mảng và thêm sản phẩm vào DOM
            temp.reverse().forEach(element => {
                productNew.appendChild(new Product(element).item());
            });
            break;
        case '2':
            // Thêm sản phẩm vào DOM theo thứ tự ban đầu
            temp.forEach(element => {
                productNew.appendChild(new Product(element).item());
            });
            break;
        case '3':
            // Sắp xếp mảng theo newPrice
            temp.sort(function(a, b) {
                return a.newPrice - b.newPrice;
            });
            // Hiển thị mảng đã được sắp xếp
            temp.forEach(element => {
                productNew.appendChild(new Product(element).item());
            });
            break;
        case '4':
            // Sắp xếp mảng theo newPrice
            temp.sort(function(a, b) {
                return a.newPrice - b.newPrice;
            });
            // Hiển thị mảng đã được sắp xếp
            temp.reverse().forEach(element => {
                productNew.appendChild(new Product(element).item());
            });
            break;
        default:
            console.log("Invalid sortType");
            break;
    }
}

