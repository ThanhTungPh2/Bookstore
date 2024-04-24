import { Order } from "../../js/Model/Order.js";

$(document).ready(function() {
    $.ajax({
        type: 'GET', // Phương thức gửi request
        url: 'http://localhost:8080/orders/'+sessionStorage.getItem("order_id"), // Địa chỉ URL của endpoint server
        xhrFields: {
            withCredentials: true // Thêm withCredentials vào XHR
        },
        success: function(response) {
            let data = JSON.parse(response)
            // Tạo phần tử div với class là "box-cart-detail"
            var div = document.createElement("div");
            div.classList.add("box-cart-detail");

            // Tạo các phần tử p và thiết lập nội dung của mỗi phần tử
            var texts = [
                "Họ tên: "+data[0].name,
                "Ngày đặt hàng: "+data[0].placedOn,
                "Số điện thoại: "+data[0].number,
                "Email: "+data[0].email,
                "Địa chỉ: "+data[0].address,
                "Ghi chú: "+data[0].note,
                "Phương thức thanh toán: "+data[0].method,
                "Trạng thái: "+data[0].status
            ];

            // Tạo và thêm các phần tử p vào trong div
            texts.forEach(function(text) {
                var p = document.createElement("p");
                p.classList.add("text-detail");
                p.textContent = text;
                div.appendChild(p);
            });

            // Thêm div vào trong body của trang web
            // Tạo một bảng
            var table = document.createElement("table");
            table.setAttribute("id", "table-product-2");
            table.setAttribute("border", "1");

            // Tạo hàng đầu tiên (header) của bảng
            var headerRow = document.createElement("tr");

            // Tạo các ô header và thiết lập nội dung của mỗi ô
            var headers = ["Bìa sách", "Tên sách", "Tác giả", "Giá", "Số lượng", "Tổng tiền"];
            headers.forEach(function(headerText) {
                var th = document.createElement("th");
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            table.appendChild(headerRow);
            let sum = 0;
            data[0].carts.product.forEach(function(rowData) {
                var row = document.createElement("tr");
            
                var imgCell = document.createElement("td");
                var imgLink = document.createElement("a");
                imgLink.setAttribute("href", "../../uploaded_img/"+rowData.image);
                var img = document.createElement("img");
                img.setAttribute("src", "../../uploaded_img/"+rowData.image);
                imgLink.appendChild(img);
                imgCell.appendChild(imgLink);
                row.appendChild(imgCell);
                sum += rowData.quantity*rowData.price;
                var otherCells = [rowData.name, rowData.author, rowData.price, rowData.quantity, rowData.quantity*rowData.price];
                otherCells.forEach(function(content) {
                    var cell = document.createElement("td");
                    cell.textContent = content;
                    row.appendChild(cell);
                });
            
                table.appendChild(row);
            });
            
            // Tạo hàng cuối cùng
            var totalRow = document.createElement("tr");
            var totalLabelCell = document.createElement("td");
            totalLabelCell.setAttribute("colspan", "5");
            totalLabelCell.setAttribute("style", "text-align: right");
            var totalLabel = document.createElement("b");
            totalLabel.textContent = "Thành tiền";
            totalLabelCell.appendChild(totalLabel);
            totalRow.appendChild(totalLabelCell);
            
            var totalPriceCell = document.createElement("td");
            var totalPrice = document.createElement("b");
            totalPrice.textContent = sum+" VND";
            totalPriceCell.appendChild(totalPrice);
            totalRow.appendChild(totalPriceCell);
            
            table.appendChild(totalRow);


            // Thêm hàng header vào bảng
            document.querySelector(".cart-detail").appendChild(div);
            document.querySelector(".cart-detail").appendChild(table);

        },
        error: function(xhr, status, error) {
        }
    });
});

