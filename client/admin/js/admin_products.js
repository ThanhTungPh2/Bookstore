
    $(".edit-product-form").hide();
    //Load thể loại
    let category;
    $.ajax({
        type: 'GET', // Phương thức gửi request
        url: 'http://localhost:8080/category/all', // Địa chỉ URL của endpoint server
        xhrFields: {
            withCredentials: true // Thêm withCredentials vào XHR
        },
        success: function(response) {
            //Hiển thị message
            category = response;
            response.forEach(element => {
                $("select[name='category']").append("<option value=\""+element.id+"\">"+element.name+"</option>");
            });
        },
        error: function(xhr, status, error) {
            $("select[name='category']").html("<option>Không có thể loại nào</option>");
        }
    });

    //Load thể loại
    function loadProduct() {
        $.ajax({
            type: 'GET', // Phương thức gửi request
            url: 'http://localhost:8080/products/all', // Địa chỉ URL của endpoint server
            xhrFields: {
                withCredentials: true // Thêm withCredentials vào XHR
            },
            success: function(response) {
                $("#table-product").empty()
                response.forEach(element => {

                    const tr = document.createElement("tr");
                    const id = document.createElement("td");
                    id.innerHTML = element.id;
                    const name = document.createElement("td");
                    name.innerHTML = element.name;
                    const author = document.createElement("td")
                    author.innerHTML = element.author;
                    const category_name = document.createElement("td")
                    category_name.innerHTML = category.find(item => item.id == element.categoryId).name
                    const price = document.createElement("td")
                    price.innerHTML = element.price
                    const discount = document.createElement("td")
                    discount.innerHTML = element.discount
                    const newprice = document.createElement("td")
                    newprice.innerHTML = element.newPrice;
                    const quantity = document.createElement("td")
                    quantity.innerHTML =  element.quantity;
                    const describes = document.createElement("td")
                    describes.innerHTML = element.describes;
                    const img = document.createElement("td")
                    img.innerHTML = "<td><img src=\"../../uploaded_img/"+element.image+"\" alt=\"\"></td>"
                    const button = document.createElement("td");
                    const button_update = document.createElement("a");
                    button_update.innerHTML = "<button class=\"button edit\">Sửa</button>"
                    button_update.addEventListener("click", function() {
                        updateProduct(element.id, category)
                    })
                    const button_delete = document.createElement("a");
                    button_delete.innerHTML = "<button class=\"button delete\">Xóa</button>"
                    button_delete.addEventListener("click", function() {
                        deleteProduct(element.id)
                    })
                    button.appendChild(button_update)
                    button.appendChild(button_delete)


                    tr.appendChild(id)
                    tr.appendChild(name)
                    tr.appendChild(author)
                    tr.appendChild(category_name)
                    tr.appendChild(price)
                    tr.appendChild(discount)
                    tr.appendChild(newprice)
                    tr.appendChild(quantity)
                    tr.appendChild(describes)
                    tr.appendChild(img)
                    tr.appendChild(button)

                    $("#table-product").append(tr)
                })
            },
            error: function(xhr, status, error) {
                $("#table-product").html("<tr><td colspan='10'>Không có thể loại nào</td></tr>");
            }
        });  
    }
    loadProduct();
    
    function updateProduct(id, category) {
        $.get('http://localhost:8080/products/id?id='+id, function(data) {
            let product = data;
            console.log(product)
            const image_container = document.createElement("div");
            image_container.classList.add("image-container")
            const img = document.createElement("img");
            img.setAttribute("src","../../uploaded_img/"+product.image)
            image_container.appendChild(img)
    
            const form = document.createElement("form")
            form.setAttribute("enctype","multipart/form-data")
    
            const update_name = document.createElement("input");
            update_name.setAttribute("type", "text");
            update_name.classList.add("box")
            update_name.setAttribute("required",true)
            update_name.setAttribute("placeholder","Tên sách")
            update_name.setAttribute("value",product.name);
    
            const update_author = document.createElement("input");
            update_author.setAttribute("type", "text");
            update_author.classList.add("box")
            update_author.setAttribute("required",true)
            update_author.setAttribute("placeholder","Tác giả")
            update_author.setAttribute("value",product.author);
    
            const update_category = document.createElement("select");
            update_category.classList.add("box")
            $.ajax({
                type: 'GET', // Phương thức gửi request
                url: 'http://localhost:8080/category/all', // Địa chỉ URL của endpoint server
                xhrFields: {
                    withCredentials: true // Thêm withCredentials vào XHR
                },
                success: function(response) {
                    //Hiển thị message
                    category = response;
                    response.forEach(element => {
                        const option = document.createElement("option")
                        option.innerHTML = element.name
                        update_category.appendChild(option);
                    });
                },
                error: function(xhr, status, error) {
                    update_category.innerHTML = "<option>Không có thể loại nào</option>";
                }
            });
               
    
            // Tạo các phần tử input
            const inputPrice = document.createElement("input");
            inputPrice.setAttribute("type", "number");
            inputPrice.setAttribute("name", "update_price");
            inputPrice.setAttribute("value", product.price);
            inputPrice.classList.add("box");
            inputPrice.setAttribute("required", true);
            inputPrice.setAttribute("placeholder", "Giá sách");
    
            const inputDiscount = document.createElement("input");
            inputDiscount.setAttribute("type", "number");
            inputDiscount.setAttribute("name", "update_discount");
            inputDiscount.setAttribute("value", product.discount);
            inputDiscount.classList.add("box");
            inputDiscount.setAttribute("required", true);
            inputDiscount.setAttribute("placeholder", "% giảm giá");
    
            const inputQuantity = document.createElement("input");
            inputQuantity.setAttribute("type", "number");
            inputQuantity.setAttribute("name", "update_quantity");
            inputQuantity.setAttribute("value", product.quantity);
            inputQuantity.classList.add("box");
            inputQuantity.setAttribute("required", true);
            inputQuantity.setAttribute("placeholder", "Số lượng sách");
    
            const inputDescribe = document.createElement("input");
            inputDescribe.setAttribute("type", "text");
            inputDescribe.setAttribute("name", "update_describe");
            inputDescribe.setAttribute("value", product.describes);
            inputDescribe.classList.add("box");
            inputDescribe.setAttribute("required", true);
            inputDescribe.setAttribute("placeholder", "Mô tả");
    
            const inputFile = document.createElement("input");
            inputFile.setAttribute("type", "file");
            inputFile.classList.add("box");
            inputFile.setAttribute("name", "update_image");
            inputFile.setAttribute("accept", "image/jpg, image/jpeg, image/png");
    
            const inputSubmit = document.createElement("input");
            inputSubmit.setAttribute("type", "button");
            inputSubmit.setAttribute("value", "Cập nhật");
            inputSubmit.setAttribute("name", "update_product");
            inputSubmit.classList.add("btn");
    
            const inputReset = document.createElement("input");
            inputReset.setAttribute("type", "button");
            inputReset.setAttribute("value", "Hủy");
            inputReset.setAttribute("id", "close-update");
            inputReset.classList.add("option-btn");
            inputReset.addEventListener("click", function() {
                $(".edit-product-form").empty().hide();
            })
    
            // Thêm các phần tử vào DOM (ví dụ: thêm vào một form có id="update-form")
            form.appendChild(update_name);
            form.appendChild(update_author);
            form.appendChild(update_category)
            form.appendChild(inputPrice);
            form.appendChild(inputDiscount);
            form.appendChild(inputQuantity);
            form.appendChild(inputDescribe);
            form.appendChild(inputFile);
            form.appendChild(inputSubmit);
            form.appendChild(inputReset);
    
    
            $(".edit-product-form").append(image_container)
            $(".edit-product-form").append(form)
            $(".edit-product-form").show();
        })
    }

    function deleteProduct (id) {
        $.ajax({
            type: 'DELETE', // Phương thức gửi request
            url: 'http://localhost:8080/products/'+id, // Địa chỉ URL của endpoint server
            xhrFields: {
                withCredentials: true // Thêm withCredentials vào XHR
            },
            success: function(response) {
                console.log(response)
                loadProduct()
            },
            error: function(xhr, status, error) {
                console.log(status)
            }
        });
    }