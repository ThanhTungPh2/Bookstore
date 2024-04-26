import {Product} from "./Model/Products.js"

//Load product và sách mới nhất
const productNew = document.getElementById('listBook');
const sort_box = document.querySelector(".sort-box");

// sort_box.addEventListener("change", function() {
//     $.get('http://localhost:8080/products/byCategory?category_id='+sessionStorage.getItem("category_id"), function(data) {
//         productNew.innerHTML = null;
//         generateProducts(data,sort_box.value);
//     })
// })

function generateCategory() {
    $.ajax({
        type: 'GET', // Phương thức gửi request
        url: 'http://localhost:8080/category/all/1', // Địa chỉ URL của endpoint server
        xhrFields: {
            withCredentials: true // Thêm withCredentials vào XHR
        },
        success: function(response) {
            response.forEach(item => {
                var divElement = document.createElement("div");
                divElement.classList.add("child");
                var paragraphElement = document.createElement("p");
                paragraphElement.innerText = item.name;
                divElement.appendChild(paragraphElement);
                divElement.addEventListener("click", function() {
                    //Load product và sách mới nhất
                    sessionStorage.setItem("category_id", item.id);
                    $.get('http://localhost:8080/products/byCategory?category_id='+item.id, function(data) {
                        productNew.innerHTML = null;
                        generatePaging(data);
                    })
                    var elements = document.querySelectorAll(".scroll-images > *");

                    // Lặp qua từng phần tử con và đặt nền
                    elements.forEach(function(element) {
                        element.style.background = "white";
                        element.style.color = "black"
                    })
                    this.style.backgroundColor = "#f05123";
                    this.style.color = "white"
                })
                document.querySelector(".scroll-images").appendChild(divElement);
                document.querySelector(".scroll-images > .child:first-child").click()
            })
        },
        error: function(xhr, status, error) {
        }
    });
}

function generatePaging(data) {
    // Số lượng trang
    var totalPages = Math.ceil(data.length / 8);

    // Phần tử cha
    var paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");

    // Tạo nút Previous («)
    var previousLink = document.createElement("a");
    previousLink.href = "#";
    previousLink.textContent = "«";
    previousLink.addEventListener("click", function(e) {
        e.preventDefault();
        let a = document.querySelector(".box-pagination .active").getAttribute("name")
        if(a > 1)
            document.querySelector(".box-pagination a[name='" + (parseInt(a) - 1) + "']").click();
        console.log(a);
    })
    paginationContainer.appendChild(previousLink);
    

    // Tạo các nút trang
    for (var i = 1; i <= totalPages; i++) {
        (function(pageIndex) { // Sử dụng hàm wrapper để bắt giá trị của i
            var pageLink = document.createElement("a");
            pageLink.textContent = pageIndex;
            pageLink.setAttribute("name",i)
            pageLink.addEventListener("click", function(e) {
                e.preventDefault();
                productNew.innerHTML = null;
                data.slice((pageIndex - 1) * 8, pageIndex * 8).forEach(element => {
                    productNew.appendChild(new Product(element).item());
                });
                paginationContainer.querySelectorAll(".box-pagination a").forEach(link => {
                    link.classList.remove("active");
                });
                pageLink.classList.add("active");
            });
            paginationContainer.appendChild(pageLink);
        })(i);
    }

    // Tạo nút Next (»)
    var nextLink = document.createElement("a");
    nextLink.href = "#";
    nextLink.textContent = "»";
    nextLink.addEventListener("click", function(e) {
        e.preventDefault();
        let a = document.querySelector(".box-pagination .active").getAttribute("name")
        if(a < totalPages)
            document.querySelector(".box-pagination a[name='" + (parseInt(a) + 1) + "']").click();
        console.log(a);
    })
    paginationContainer.appendChild(nextLink);

    // Ghi đè nội dung của phần tử cha vào .box-pagination
    var boxPagination = document.querySelector(".box-pagination");
    boxPagination.innerHTML = "";
    boxPagination.appendChild(paginationContainer);
    document.querySelector(".box-pagination a[name='1'").click();
}

generateCategory();


// function generateProducts(data, sortType = '2') {
//     // Tạo một bản sao của mảng trước khi sắp xếp
//     let temp = data.slice();
//     switch (sortType) {
//         case '1':
//             // Đảo ngược mảng và thêm sản phẩm vào DOM
//             temp.reverse().forEach(element => {
//                 productNew.appendChild(new Product(element).item());
//             });
//             break;
//         case '2':
//             // Thêm sản phẩm vào DOM theo thứ tự ban đầu
//             temp.forEach(element => {
//                 productNew.appendChild(new Product(element).item());
//             });
//             break;
//         case '3':
//             // Sắp xếp mảng theo newPrice
//             temp.sort(function(a, b) {
//                 return a.newPrice - b.newPrice;
//             });
//             // Hiển thị mảng đã được sắp xếp
//             temp.forEach(element => {
//                 productNew.appendChild(new Product(element).item());
//             });
//             break;
//         case '4':
//             // Sắp xếp mảng theo newPrice
//             temp.sort(function(a, b) {
//                 return a.newPrice - b.newPrice;
//             });
//             // Hiển thị mảng đã được sắp xếp
//             temp.reverse().forEach(element => {
//                 productNew.appendChild(new Product(element).item());
//             });
//             break;
//         default:
//             console.log("Invalid sortType");
//             break;
//     }
// }

