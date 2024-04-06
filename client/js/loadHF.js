async function insertHTML(id, filePath) {
    const response = await fetch(filePath);
    const htmlContent = await response.text();
    document.getElementById(id).innerHTML = htmlContent;
}

async function loadHTML() {
    // Chờ đợi cho header và footer được chèn vào DOM
    await insertHTML('header', '../html/header.html');
    await insertHTML('footer', '../html/footer.html');

   //Check login
   $.ajax({
    type: 'GET', // Phương thức gửi request
    url: 'http://localhost:8080/api/v1/auth/refreshLogin', // Địa chỉ URL của endpoint server
    xhrFields: {
        withCredentials: true // Thêm withCredentials vào XHR
    },
    success: function(response) {
        console.log(response)
    },
    error: function(xhr, status, error) {
        
    }
});
}

// Gọi hàm loadHTML()
loadHTML();
