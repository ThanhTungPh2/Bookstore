import { Category } from "./Model/Category.js";
import { Users } from "./Model/Users.js";

$(document).ready(function() {
    $.get('http://localhost:8080/products/id?id='+sessionStorage.getItem("product_details_id"), function(data) {
        console.log(data)
        $(".Product_name").html(data.name)
        $(".Product_images .image").attr("src", "../uploaded_img/"+data.image)
        $(".author").html("Tác giả: "+data.author)
        $.get('http://localhost:8080/category?id='+data.categoryId, function(data_2) {
            $(".Product_Categories").html("Danh mục: "+data_2.name)

            $.get('http://localhost:8080/products/byCategory?category_id='+data.categoryId, function(data_4) {
                console.log(data_4.slice(0,8))
                $("#book_other").append(new Category(data_2,data_4.slice(0,8)).item())      
            })
        })
        $("._NewPrice").html(data.newPrice.toLocaleString('en-US') + " VND")
        $("._Price").html(data.price.toLocaleString('en-US') + " VND");
        $(".describe").html("Số lượng còn lại: "+data.quantity);
        $(".qty").attr('max',data.quantity);
    });
    
    
    function add_to_carts(product_id, user_id, quantity) {
        if (sessionStorage.getItem("logged")) {
            window.location.href = "../html/index.html"
        }
        else {
          let formData = {
            userId : user_id.id,
            productId : product_id,
            quantity : quantity
          }
          $.get('http://localhost:8080/products/id?id='+product_id, function(data) {
            if (quantity < 0) {
              $('.message span').html('Số lượng sách không được âm!')
              $('.message').show()
              Carts.showCarts()
      
              setTimeout(function() {
                $('.message').hide()
              }, 3000);
            }
            else if (data.quantity < quantity) {
              $('.message span').html('Vượt quá số lượng sách trong kho!')
              $('.message').show()
      
              setTimeout(function() {
                $('.message').hide()
              }, 3000);
            }
            else {
              $.ajax({
                type: 'POST', // Phương thức gửi request
                url: 'http://localhost:8080/carts/add', // Địa chỉ URL của endpoint server
                data: JSON.stringify(formData), // Dữ liệu gửi đi
                contentType:"application/json; charset=utf-8",
                xhrFields: {
                    withCredentials: true // Thêm withCredentials vào XHR
                },
                success: function(response) {
                 //Hiển thị message
                 $('.message span').html(response)
                 $('.message').show()
        
                 setTimeout(function() {
                   $('.message').hide()
                 }, 3000);
                },
                error: function(xhr, status, error) {
                  //Hiển thị message
                  window.location.href = "../html/login.html"
                }
              });
            }
          })
        }
      } 
      $("input[name='add_to_cart']").on("click", function() {
        add_to_carts(sessionStorage.getItem("product_details_id"),Users.checkLoggedCookie(), $("input[name='product_quantity']").val())
      });
      $("input[name='mua_ngay']").on("click", function() {
        add_to_carts(sessionStorage.getItem("product_details_id"),Users.checkLoggedCookie(), $("input[name='product_quantity']").val())
        window.location.href = "./checkout.html";
      })
});

{/* <input type="button" value="Mua ngay" name="mua_ngay" class="pay_product">
<input type="button" value="Thêm vào giỏ hàng" name="add_to_cart" class="add_product"></input> */}

