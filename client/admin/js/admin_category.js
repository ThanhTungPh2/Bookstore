$(".edit-product-form").hide()
function addCategory() {
    
}
function loadCategory() {
    $.ajax({
        type: 'GET', // Phương thức gửi request
        url: 'http://localhost:8080/category/all', // Địa chỉ URL của endpoint server
        xhrFields: {
            withCredentials: true // Thêm withCredentials vào XHR
        },
        success: function(response) {
            const box_container = document.querySelector(".show-products .box-container");
            response.forEach(element => {
                
                var boxDiv = document.createElement("div");
                boxDiv.classList.add("box");

                if (element.status == 1)
                    boxDiv.style.opacity = "1";
                else
                    boxDiv.style.opacity = "0.5";
    
                var nameDiv = document.createElement("div");
                nameDiv.classList.add("name");
                nameDiv.textContent = element.name; // fetch_categorys['name'] trong đoạn mã PHP
    
                var subNameDiv = document.createElement("div");
                subNameDiv.classList.add("sub-name");
                subNameDiv.textContent = "Mô tả: " + element.describes; // fetch_categorys['describes'] trong đoạn mã PHP
    
                var updateLink = document.createElement("a");
                updateLink.classList.add("option-btn");
                updateLink.textContent = "Cập nhật";
                updateLink.style.marginRight = "1rem";

                updateLink.addEventListener("click", function() {
                    updateCategory(document.querySelector(".edit-product-form"), element)
                    $(".edit-product-form").show();
                })
    
                var deleteLink = document.createElement("a");
                deleteLink.classList.add("delete-btn");
                if (element.status == 1)
                    deleteLink.textContent = "Hiện";
                else
                    deleteLink.textContent = "Ẩn";

                deleteLink.onclick = function() {
                    let status;
                    if (this.textContent == "Ẩn") {
                        this.textContent = "Hiện";
                        status = 1
                        boxDiv.style.opacity = "1";
                    } else {
                        this.textContent = "Ẩn";
                        status = 0
                        boxDiv.style.opacity = "0.5";
                    }
                    
                    $.ajax({
                        type: 'PUT', // Phương thức gửi request
                        url: 'http://localhost:8080/category?id='+element.id+'&status='+status+'', // Địa chỉ URL của endpoint server
                        xhrFields: {
                            withCredentials: true // Thêm withCredentials vào XHR
                        },
                        success: function(response) {
                            console.log(response)
                        },
                        error: function(xhr, status, error) {
                            console.log(status)
                        }
                    });
                };
    
                boxDiv.appendChild(nameDiv);
                boxDiv.appendChild(subNameDiv);
                boxDiv.appendChild(updateLink);
                boxDiv.appendChild(deleteLink);
    
                box_container.appendChild(boxDiv);
            });
        },
        error: function(xhr, status, error) {
           
        }
    });
}

function updateCategory(box, element) {
    // Tạo một thẻ form
    var form = document.createElement("form");
    form.setAttribute("action", "");
    form.setAttribute("method", "post");
    form.setAttribute("enctype", "multipart/form-data");

    // Tạo một thẻ input hidden
    var hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "update_p_id");
    hiddenInput.setAttribute("value", "<?php echo $fetch_update['id']; ?>");

    // Tạo một thẻ input text cho tên
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "update_name");
    nameInput.setAttribute("value", element.name);
    nameInput.setAttribute("class", "box");
    nameInput.setAttribute("required", "required");
    nameInput.setAttribute("placeholder", "Tên");

    // Tạo một thẻ input text cho mô tả
    var describesInput = document.createElement("input");
    describesInput.setAttribute("type", "text");
    describesInput.setAttribute("name", "update_describes");
    describesInput.setAttribute("value", element.describes);
    describesInput.setAttribute("class", "box");
    describesInput.setAttribute("required", "required");
    describesInput.setAttribute("placeholder", "Mô tả");

    // Tạo một thẻ input submit
    var submitInput = document.createElement("input");
    submitInput.setAttribute("type", "button");
    submitInput.setAttribute("value", "Cập nhật");
    submitInput.setAttribute("name", "update_category");
    submitInput.setAttribute("class", "btn");
    submitInput.style.marginRight = "1rem"
    submitInput.addEventListener("click", function() {
        let formData = {
            id: element.id,
            name: $("input[name='update_name']").val(),
            describes: $("input[name='update_describes']").val(),
            status: element.status
        }
        console.log(formData, element)
        $.ajax({
            type: 'PATCH', // Phương thức gửi request
            url: 'http://localhost:8080/category/update', // Địa chỉ URL của endpoint server
            data: JSON.stringify(formData), // Dữ liệu gửi đi
            contentType:"application/json; charset=utf-8",
            xhrFields: {
                withCredentials: true // Thêm withCredentials vào XHR
            },
            success: function(response) {
                $('.message span').html("Cập nhật thể loại thành công")
                $('.message').show()

                setTimeout(function() {
                  $('.message').hide()
                  location.reload(true);
                }, 2000);
            },
            error: function(xhr, status, error) {
                console.log(status)
            }
        });
    })

    // Tạo một thẻ input reset
    var resetInput = document.createElement("input");
    resetInput.setAttribute("type", "reset");
    resetInput.setAttribute("value", "Hủy");
    resetInput.setAttribute("class", "option-btn");
    resetInput.onclick = function() {
        box.innerHTML = "";
        $(".edit-product-form").hide()
    };

    // Thêm các thẻ input vào form
    form.appendChild(hiddenInput);
    form.appendChild(nameInput);
    form.appendChild(describesInput);
    form.appendChild(submitInput);
    form.appendChild(resetInput);

    // Thêm form vào body của trang web
    box.appendChild(form);

}
loadCategory();