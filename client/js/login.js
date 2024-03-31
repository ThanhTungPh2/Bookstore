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
            success: function(response) {
                // Xử lý phản hồi từ server khi request thành công
                console.log(response);

                // Kiểm tra xem phản hồi có chứa token không
                if (response.token) {
                    // Lưu token vào biến hoặc localStorage để sử dụng sau này
                    var token = response.token;
                    console.log("Token received:", token);
                } else {
                    console.error("No token received from server.");
                }

                //Hiển thị message
                $('.message span').html('Đăng nhập thành công!')
                $('.message').show()
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

