import { Users } from "../../js/Model/Users.js";
import { Search } from "../../js/Model/Search.js"

$(document).ready(function() {
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
                generateUser(response)
            },
            error: function(xhr, status, error) {
    
            }
        });
    }
    function generateUser(data) {
        document.querySelector("#table-product").innerHTML = null;
        // Tạo một hàng mới
        var newRow = document.createElement("tr");

        // Tạo các ô cột và thêm nội dung
        var cell1 = document.createElement("td");
        cell1.textContent = "Mã người dùng"; // Thay thế "Mã người dùng" bằng dữ liệu thực tế
        newRow.appendChild(cell1);

        var cell2 = document.createElement("td");
        cell2.textContent = "Tên người dùng"; // Thay thế "Tên người dùng" bằng dữ liệu thực tế
        newRow.appendChild(cell2);

        var cell3 = document.createElement("td");
        cell3.textContent = "Email"; // Thay thế "Email" bằng dữ liệu thực tế
        newRow.appendChild(cell3);

        var cell4 = document.createElement("td");
        cell4.textContent = "Quyền"; // Thay thế "Quyền" bằng dữ liệu thực tế
        newRow.appendChild(cell4);

        var cell5 = document.createElement("td");
        // Tạo một nút hoặc bất kỳ phần tử HTML nào khác cho cột "Hành động"
        var actionButton = document.createElement("button");
        actionButton.textContent = "Edit"; // Text của nút, có thể thay đổi tùy ý
        cell5.appendChild(actionButton);
        newRow.appendChild(cell5);

        document.querySelector("#table-product").appendChild(newRow);
        data.forEach(element => {
            // Tạo một thẻ tr
            var tr = document.createElement("tr");
    
            // Tạo các thẻ td và thêm nội dung vào mỗi ô
            var td1 = document.createElement("td");
            td1.textContent = element.id;
    
            var td2 = document.createElement("td");
            td2.textContent = element.name;
    
            var td3 = document.createElement("td");
            td3.textContent = element.email;
    
            var td4 = document.createElement("td");
            td4.textContent = element.role;
    
            var td5 = document.createElement("td");
            var deleteLink = document.createElement("a");
            if (element.status == 1) {
                deleteLink.textContent = "Active";
                deleteLink.style.backgroundColor = "green"
            }
            else {
                deleteLink.textContent = "Hide"
                deleteLink.style.backgroundColor = "red"
            }
            if (element.role == "ADMIN") {
                deleteLink.style.pointerEvents = "none";
            }
            
            deleteLink.className = "delete-btn";
            deleteLink.onclick = function() {
                let status;
                if (this.textContent == "Hide") {
                    this.textContent = "Active";
                    deleteLink.style.backgroundColor = "green"
                    status = 1
                } else {
                    this.textContent = "Hide";
                    status = 0
                    deleteLink.style.backgroundColor = "red"
                }
                let formData = {
                    id:element.id,
                    status: status
                }
                $.ajax({
                    type: 'PATCH', // Phương thức gửi request
                    url: 'http://localhost:8080/users/status', // Địa chỉ URL của endpoint server
                    data: JSON.stringify(formData), // Dữ liệu gửi đi
                    contentType:"application/json; charset=utf-8",
                    xhrFields: {
                        withCredentials: true // Thêm withCredentials vào XHR
                    },
                    success: function(response) {
                        console.log(response)
                    },
                    error: function(xhr, status, error) {
                        console.log(status)
                    }
                });
            };
            td5.appendChild(deleteLink);
    
            // Thêm các ô vào thẻ tr
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
    
            // Thêm thẻ tr vào bảng (ví dụ, giả sử có một bảng với id là "userTable")
            document.querySelector("#table-product").appendChild(tr);
    
        });
    }
    function find() {
        $("#find_user").on("click",function(event) {
            // Ngăn chặn hành vi mặc định của form (tải lại trang)
            event.preventDefault();
            console.log("meo")
    
            // Lấy giá trị từ các trường input
            var email = $('input[name="email"]').val();
            $.ajax({
                type: 'GET', // Phương thức gửi request
                url: 'http://localhost:8080/users/Email?email='+email, // Địa chỉ URL của endpoint server
                xhrFields: {
                    withCredentials: true // Thêm withCredentials vào XHR
                },
                success: function(response) {
                    generateUser([response])
                },
                error: function(xhr, status, error) {

                }
            });
        });
    }
    
    loadUsers();
    find()
})

