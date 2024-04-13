function add_to_carts(e) {
    if (sessionStorage.getItem("logged")) {
        window.location.href = "../html/index.html"
    }

    if ($(".qty").data("value") > $(this).data("product_qty")) {
        //Thông báo
    }
    else {
        $.get('http://localhost:8080/orders/All', function(data) {
            let orders = data_4.filter(function(item) {
                return item.status == 'Chờ xác nhận';
            })
            if (orders){
                
            }
            else {
                //thêm mới
            }

        })
    }
}
//Có số lượng không, nếu không mặc định bằng 1

//Kiể tra xem có order nào chưa thanh toán không thì đưa vào đấy
//kiểm tra sách có trong giỏ hàng chưa và tăng số lượng
//Nếu chưa có order thì thêm mới
//Thông báo

