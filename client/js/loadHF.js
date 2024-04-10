async function insertHTML(id, filePath) {
    const response = await fetch(filePath);
    const htmlContent = await response.text();
    document.getElementById(id).innerHTML = htmlContent;
}

async function loadHTML() {
    // Chờ đợi cho header và footer được chèn vào DOM
    await insertHTML('header', '../html/header.html');
    await insertHTML('footer', '../html/footer.html');

    $('.register').hide();
    $('.login').hide();
    $('#cart').hide();
    $('#user-btn').hide();

    
    let userBox = document.querySelector('.header .header-2 .user-box');

    document.querySelector('#user-btn').onclick = () =>{
    userBox.classList.toggle('active');
    navbar.classList.remove('active');
    }

    let navbar = document.querySelector('.header .header-2 .navbar');

    document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    userBox.classList.remove('active');
    }

    window.onscroll = () =>{
    userBox.classList.remove('active');
    navbar.classList.remove('active');

    if(window.scrollY > 60){
        document.querySelector('.header .header-2').classList.add('active');
    }else{
        document.querySelector('.header .header-2').classList.remove('active');
    }
    }
   //Check login
   $.ajax({
    type: 'GET', // Phương thức gửi request
    url: 'http://localhost:8080/api/v1/auth/refreshLogin', // Địa chỉ URL của endpoint server
    xhrFields: {
        withCredentials: true // Thêm withCredentials vào XHR
    },
    success: function(response) {
        if (response.email != "" && response.name != "") {
            $('#cart').show();
            $('#name-user').html(response.name);
            $('#email-user').html(response.email);
            $('#user-btn').show();
        }
        else {
            $('.register').show();
            $('.login').show();
        }
    },
    });
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

// Gọi hàm loadHTML()
loadHTML();
