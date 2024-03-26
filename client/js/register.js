$(document).ready(function() {
    $('#regisForm').submit(function(event) {
        // Ngăn chặn hành vi mặc định của form (tải lại trang)
        event.preventDefault();

        // Lấy giá trị từ các trường input
        var email = $('input[name="email"]').val();
        var password = $('input[name="password"]').val();
        var name = $('input[name="name"]').val();
        var cpassword = $('input[name="cpassword"]').val();
        
        // Dữ liệu để gửi lên server
        var formData = {
            name: name,
            email: email,
            password: password
        };
        console.log(JSON.stringify(formData))
        // Gửi request Ajax
        $.ajax({
            type: 'POST', // Phương thức gửi request
            url: 'http://localhost:8080/api/v1/auth/register', // Địa chỉ URL của endpoint server
            data: JSON.stringify(formData), // Dữ liệu gửi đi
            dataType: 'json',
            contentType:"application/json; charset=utf-8",
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                console.log(status, error)
            }
        });
    });
});
