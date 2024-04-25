import { Category } from "./Model/Category.js";

$(document).ready(function() {
    $.get('http://localhost:8080/products/id?id='+sessionStorage.getItem("product_details_id"), function(data) {
        console.log(data)
        $(".Product_name").html(data.name)
        $(".Product_images .image").attr("src", "../uploaded_img/"+data.image)
        $(".author").html("Tác giả: "+data.author)
        $.get('http://localhost:8080/category?id='+data.categoryId, function(data_2) {
            $(".Product_Categories").html("Danh mục: "+data_2.name)

            $.get('http://localhost:8080/products/byCategory?category_id='+data.categoryId, function(data_4) {
                $("#book_other").append(new Category(data_2,data_4.filter(function(item) {
                    return item.id !== 4;
                })).item())      
            })
        })
        $("._NewPrice").html(data.newPrice.toLocaleString('en-US') + " VND")
        $("._Price").html(data.price.toLocaleString('en-US') + " VND");
        $(".describe").html("Số lượng còn lại: "+data.quantity);
        $(".qty").attr('max',data.quantity);
    })
    
    
});

