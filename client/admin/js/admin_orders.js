import {Search} from "../../js/Model/Search.js"

function loadOrders() {
   $.ajax({
      type: 'GET', // Phương thức gửi request
      url: 'http://localhost:8080/orders/All', // Địa chỉ URL của endpoint server
      xhrFields: {
          withCredentials: true // Thêm withCredentials vào XHR
      },
      success: function(response) {
         let data = JSON.parse(response)
         generateOrder(data)
      },
      error: function(xhr, status, error) {

      }
  });
}
function loadUsers() {
    $.ajax({
        type: 'GET', // Phương thức gửi request
        url: 'http://localhost:8080/users/ALL', // Địa chỉ URL của endpoint server
        xhrFields: {
            withCredentials: true // Thêm withCredentials vào XHR
        },
        success: function(response) {
            let inp = document.querySelector("input[name='email']");
            Search.autocomplete(inp, response.map(element => element.email));
        },
        error: function(xhr, status, error) {

        }
    });
}

function generateOrder(data) {
    document.querySelector("table tbody").innerHTML = null;
    // Tạo một hàng mới
    var newRow = document.createElement("tr");

    // Dữ liệu cho các tiêu đề cột
    var headers = [
        "Mã đơn hàng",
        "Tên khách hàng",
        "Số điện thoại",
        "Email",
        "Địa chỉ nhận",
        "Lời nhắn",
        "Thời gian",
        "Tổng tiền",
        "Trạng thái",
        "Thao tác"
    ];

    // Tạo và thêm các tiêu đề cột vào hàng mới
    headers.forEach(function(headerText) {
        var headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        newRow.appendChild(headerCell);
    });

    // Chèn hàng mới vào bảng// Thay "yourTableId" bằng id của bảng
    document.querySelector("table tbody").appendChild(newRow);

    data.forEach(element => {
            
        // Tạo một thẻ tr
        var tr = document.createElement("tr");

        // Tạo các thẻ td và thiết lập nội dung cho mỗi td
        var td1 = document.createElement("td");
        td1.textContent = element.id;

        var td2 = document.createElement("td");
        td2.textContent = element.userName;

        var td3 = document.createElement("td");
        td3.textContent = element.number;

        var td4 = document.createElement("td");
        td4.textContent = element.email;

        var td5 = document.createElement("td");
        td5.textContent = element.address;

        var td6 = document.createElement("td");
        td6.textContent = element.note;

        var td7 = document.createElement("td");
        td7.textContent = element.placedOn;

        var td8 = document.createElement("td");
        td8.textContent = "254600 VND";

        // Tạo thẻ select và các option
        var select = document.createElement("select");
        select.setAttribute("name", "update_status");
        select.setAttribute("class", "box-select");
        select.value = element.status;
        
        var option1 = document.createElement("option");
        option1.setAttribute("value", "Chờ xác nhận");
        option1.textContent = "Chờ xác nhận";
        if (element.status === "Chờ xác nhận") {
            option1.setAttribute("selected", "selected");
        }
        
        var option2 = document.createElement("option");
        option2.setAttribute("value", "Đã xác nhận");
        option2.textContent = "Đã xác nhận";
        if (element.status === "Đã xác nhận") {
            option2.setAttribute("selected", "selected");
        }
        
        var option3 = document.createElement("option");
        option3.setAttribute("value", "Đã giao");
        option3.textContent = "Đã giao";
        if (element.status === "Đã giao") {
            option3.setAttribute("selected", "selected");
        }
        
        var option4 = document.createElement("option");
        option4.setAttribute("value", "Huỷ");
        option4.textContent = "Huỷ";
        if (element.status === "Huỷ") {
            option4.setAttribute("selected", "selected");
        }
        
        // Thêm các option vào select
        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        select.appendChild(option4);

        select.addEventListener("change", function() {
            // Xử lý sự kiện thay đổi ở đây
            changeStatus(select.value, element.id);
        });

        // Tạo thẻ td cho select
        var td9 = document.createElement("td");
        td9.appendChild(select);

        // Tạo thẻ input submit
        // var submitInput = document.createElement("input");
        // submitInput.setAttribute("type", "submit");
        // submitInput.setAttribute("name", "update");
        // submitInput.setAttribute("class", "input-order input-order-update");
        // submitInput.setAttribute("value", "Cập nhật");

        // Tạo thẻ button cho chi tiết và thiết lập sự kiện onclick
        var detailButton = document.createElement("button");
        detailButton.setAttribute("class", "input-order input-order-detail");
        detailButton.textContent = "Chi tiết";
        detailButton.onclick = function() {
            sessionStorage.setItem("order_id", element.id);
            location.href = 'admin_orders_details.html';
        };

        // Tạo thẻ td cho các nút cập nhật và chi tiết
        var td10 = document.createElement("td");
        var actionDiv = document.createElement("div");
        actionDiv.setAttribute("class", "action-order");
        // actionDiv.appendChild(submitInput);
        actionDiv.appendChild(detailButton);
        td10.appendChild(actionDiv);

        // Thêm các phần tử td vào tr
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tr.appendChild(td9);
        tr.appendChild(td10)

        // Thêm tr vào tbody của table
        var tbody = document.querySelector("table tbody"); // Thay "table tbody" bằng selector của tbody trong table của bạn
        tbody.appendChild(tr);

     });
}

function changeStatus(value, id) {
    let formData = {
        id:id,
        status:value
    }
    console.log(formData)
    $.ajax({
        type: 'PATCH', // Phương thức gửi request
        url: 'http://localhost:8080/orders', // Địa chỉ URL của endpoint server
        data: JSON.stringify(formData), // Dữ liệu gửi đi
        dataType: 'json',
        contentType:"application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true // Thêm withCredentials vào XHR
        },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {

        }
    });
}
function find() {
    $("#find_order").on("click",function(event) {
        // Ngăn chặn hành vi mặc định của form (tải lại trang)
        event.preventDefault();
        
        // Lấy giá trị từ các trường input
        var email = $("input[name='email']").val();
        console.log(email)
        let formData = {
            email: email
        }
        
        $.ajax({
            type: 'POST', // Phương thức gửi request
            url: 'http://localhost:8080/orders/All/Email', // Địa chỉ URL của endpoint server
            data: JSON.stringify(formData), // Dữ liệu gửi đi
            dataType: 'json',
            contentType:"application/json; charset=utf-8",
            xhrFields: {
                withCredentials: true // Thêm withCredentials vào XHR
            },
            success: function(response) {
                generateOrder(response)
            },
            error: function(xhr, status, error) {

            }
        });
    })
}

loadOrders();
loadUsers();
find();