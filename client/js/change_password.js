import { Users } from "../js/Model/Users.js" 

$(document).ready(function() {
    $('.message').hide()
    $('input[name="email"]').val(Users.checkLoggedCookie().email);
    $('input[name="name"]').val(Users.checkLoggedCookie().name);
    $('input[name="email"]').attr('disabled', 'disabled');
    $('input[name="name"]').attr('disabled', 'disabled');
    $('#changeForm').submit(function(event) {
        // Ngăn chặn hành vi mặc định của form (tải lại trang)
        event.preventDefault();

        // Lấy giá trị từ các trường input
        var password = $('input[name="password"]').val();
        var cpassword = $('input[name="cpassword"]').val();

        let formData = {
            currentPassword:password,
            newPassword:cpassword
        }

        $.ajax({
            type: 'PATCH', // Phương thức gửi request
            url: 'http://localhost:8080/users', // Địa chỉ URL của endpoint server
            data: JSON.stringify(formData), // Dữ liệu gửi đi
            contentType:"application/json; charset=utf-8",
            xhrFields: {
                withCredentials: true // Thêm withCredentials vào XHR
            },
            success: function(response) {
                //Hiển thị message
                $('.message span').html('Đổi mật khẩu thành công!')
                $('.message').show()
                setTimeout(function() {
                    window.location.href = "../html/index.html"
                }, 2000);
            },
            error: function(xhr, status, error) {
                //Hiển thị message
                $('.message span').html('Thông tin không chính xác!')
                $('.message').show()
            }
        });
    });
})