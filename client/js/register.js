$(document).ready(function() {
    $('.message').hide()
    $('#regisForm').submit(function(event) {
        // Ngăn chặn hành vi mặc định của form (tải lại trang)
        event.preventDefault();

        // Lấy giá trị từ các trường input
        var email = $('input[name="email"]').val();
        var password = $('input[name="password"]').val();
        var name = $('input[name="name"]').val();
        var cpassword = $('input[name="cpassword"]').val();
        
        if (cpassword != password) {
            $('#message').html('Confirm password sai')
            return
        } 
        // Dữ liệu để gửi lên server
        var formData = {
            name: name,
            email: email,
            password: password,
            role: 'USER'
        };

        // Gửi request Ajax
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
    $("#regisForm input").focus(function() { $("#message").html("") })
    $('.message i').click(function() { $(".message").hide() })
});

