import { Users } from "./Model/Users.js";
import { Notice } from "./Model/Notice.js";

//<p> <?php echo $fetch_cart['product_name']; ?> <span>(<?php echo $fetch_cart['product_price'] . ' VND' . ' x ' . $fetch_cart['cart_quantity']; ?>)</span> </p>
let btnOrder = document.querySelector("#btn_order")
$.ajax({
    type: 'GET', // Phương thức gửi request
    url: 'http://localhost:8080/carts/'+Users.checkLoggedCookie().id, // Địa chỉ URL của endpoint server
    xhrFields: {
        withCredentials: true // Thêm withCredentials vào XHR
    },
    success: function(response) {
        let data = JSON.parse(response);
        let display_orders = document.querySelector(".display-order");
        data.product.forEach(element => {
            let p = document.createElement("p");
            p.innerHTML = element.name + " <span> ( "+element.price +"VND X"+element.quantity+") </span>";
            display_orders.appendChild(p)
        });

        let sum = 0;
        data.product.forEach(element => {
            sum += element.quantity * element.price;
        })
        const grand_total = document.createElement("div");
        grand_total.classList.add("grand-total");
        grand_total.innerHTML = "Tổng số tiền : <span>"+sum+" VND</span> "
        display_orders.appendChild(grand_total);

        btnOrder.disabled = false;
        btnOrder.style.opacity = '1';
        btnOrder.value = "Đặt hàng";
    },
    error: function(xhr, status, error) {
        btnOrder.disabled = true;
        btnOrder.style.opacity = '0.5';
        btnOrder.value = "Không thể đặt hàng";
    }
});


btnOrder.addEventListener("click", function(e) {
    console.log("meomeo")
    e.preventDefault();

    const name = $("input[name='name']").val();
    const phone = $("input[name='number']").val();
    const email = $("input[name='email']").val();
    const credit = $("select[name='method']").val();
    const address = $("input[name='street']").val();
    const city = $("input[name='city']").val();
    const note = $("input[name='note']").val();

    console.log(address)

    let message = "";
    
    if (!Notice.validateEmail(email)) {
        message = "Email sai định dạng";
    }
    else if (!Notice.validatePhone(phone)) {
        message = "Số điện thoại không đúng";
    }

    var currentDate = new Date();
    var formattedDate = currentDate.toISOString().slice(0, 10);
    // Perform validation
    if (message == "") {
        let formData = {
            id: "",
            userId: Users.checkLoggedCookie().id,
            name: name,
            number: phone,
            email: email,
            method: credit,
            address: address,
            note: note,
            placedOn: formattedDate,
            status: "Chờ xác nhận"
        }
        $.ajax({
            type: 'PUT', // Phương thức gửi request
            url: 'http://localhost:8080/orders', // Địa chỉ URL của endpoint server
            data: JSON.stringify(formData), // Dữ liệu gửi đi
            contentType:"application/json; charset=utf-8",
            xhrFields: {
                withCredentials: true // Thêm withCredentials vào XHR
            },
            success: function(response) {
                $('.message span').html("Đặt hàng thành công");
                $('.message').show()
                setTimeout(function() {
                    window.location.href = '../html/current_orders.html'
                }, 2000);
            },
            error: function(xhr, status, error) {
                $('.message span').html("Đặt hàng thành công");
                $('.message').show()
            }
        });
    } else {
        $('.message span').html(message)
        $('.message').show()
    }
})
