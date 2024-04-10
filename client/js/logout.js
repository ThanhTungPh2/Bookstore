function logout() {
    $.ajax({
        type: 'GET', // Phương thức gửi request
        url: 'http://localhost:8080/api/v1/auth/logout', // Địa chỉ URL của endpoint server
        xhrFields: {
            withCredentials: true // Thêm withCredentials vào XHR
        },
        success: function(response) {
            
        },
    });
}