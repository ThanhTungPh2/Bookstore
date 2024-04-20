import { Users } from "../js/Model/Users.js" 

$(document).ready(function() {
    $('.message').hide()
    $('#loginForm').submit(function(event) {
        // Ngăn chặn hành vi mặc định của form (tải lại trang)
        event.preventDefault();

        // Lấy giá trị từ các trường input
        var email = $('input[name="email"]').val();
        var password = $('input[name="password"]').val();

        // Dữ liệu để gửi lên server
        var formData = {
            email: email,
            password: password
        };
        console.log(JSON.stringify(formData))
        // Gửi request Ajax
        $.ajax({
            type: 'POST', // Phương thức gửi request
            url: 'http://localhost:8080/api/v1/auth/authenticate', // Địa chỉ URL của endpoint server
            data: JSON.stringify(formData), // Dữ liệu gửi đi
            dataType: 'json',
            contentType:"application/json; charset=utf-8",
            xhrFields: {
                withCredentials: true // Thêm withCredentials vào XHR
            },
            success: function(response) {
                //Hiển thị message
                $('.message span').html('Đăng nhập thành công!')
                $('.message').show()

                setTimeout(function() {
                    // Redirect to the homepage
                    console.log(Users.checkLoggedCookie())
                    if (Users.checkLoggedCookie().role == "USER")
                        window.location.href = 'index.html'; // Replace 'homepage.html' with the URL of your homepage
                    else if (Users.checkLoggedCookie().role == "ADMIN")
                        window.location.href = '../../client/admin/html/admin_page.html'
                }, 2000);
            },
            error: function(xhr, status, error) {
                //Hiển thị message
                $('.message span').html('Tài khoản hoặc mật khẩu không chính xác!')
                $('.message').show()
            }
        });
    });
    $("#loginForm input").focus(function() { $(".message").hide() })
    $('.message i').click(function() { $(".message").hide() })
});

