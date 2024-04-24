import { Users } from "../../js/Model/Users.js";

function loadUsers() {
    $.ajax({
        type: 'GET', // Phương thức gửi request
        url: 'http://localhost:8080/users/ALL', // Địa chỉ URL của endpoint server
        xhrFields: {
            withCredentials: true // Thêm withCredentials vào XHR
        },
        success: function(response) {
            console.log(response);

            response.forEach(element => {
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
                        dataType: 'json',
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
        },
        error: function(xhr, status, error) {

        }
    });
}

function addUsers() {
    $("input[name='add_user']").on("click",function(event) {
        // Ngăn chặn hành vi mặc định của form (tải lại trang)
        event.preventDefault();

        // Lấy giá trị từ các trường input
        var email = $('input[name="email"]').val();
        var password = $('input[name="password"]').val();
        var name = $('input[name="name"]').val();
        var role = $('select[name="user_type"]').val();
         
        // Dữ liệu để gửi lên server
        var formData = {
            name: name,
            email: email,
            password: password,
            role: role,
            status:1
        };
        console.log(formData)

        //Gửi request Ajax
        $.ajax({
            type: 'POST', // Phương thức gửi request
            url: 'http://localhost:8080/api/v1/auth/register', // Địa chỉ URL của endpoint server
            data: JSON.stringify(formData), // Dữ liệu gửi đi
            dataType: 'json',
            contentType:"application/json; charset=utf-8",
            success: function(response) {
                $('.message span').html('Đăng ký thành công!')
                $('.message').show()
            },
            error: function(xhr, status, error) {
                $('.message span').html('Email đã được đăng ký!')
                $('.message').show()
            }
        });
    });
}

loadUsers();
addUsers();