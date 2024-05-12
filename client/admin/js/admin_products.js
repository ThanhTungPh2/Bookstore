
    $(".edit-product-form").hide();
    const productNew = document.querySelector('#table-product');
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
            url: 'http://localhost:8080/products/all2', // Địa chỉ URL của endpoint server
            xhrFields: {
                withCredentials: true // Thêm withCredentials vào XHR
            },
            success: function(response) {
                generatePaging(response);
            },
            error: function(xhr, status, error) {
                productNew.html("<tr><td colspan='10'>Không quyển sách nào</td></tr>");
            }
        });  
    }
    function generateProduct(data) {
        productNew.innerHTML = null;

        var newRow = document.createElement('tr');
        var cell1 = document.createElement('th');
        cell1.textContent = 'Mã sách';
        newRow.appendChild(cell1);
        var cell2 = document.createElement('th');
        cell2.textContent = 'Tên sách';
        newRow.appendChild(cell2);
        var cell3 = document.createElement('th');
        cell3.textContent = 'Tác Giả';
        newRow.appendChild(cell3);
        var cell4 = document.createElement('th');
        cell4.textContent = 'Thể loại';
        newRow.appendChild(cell4);
        var cell5 = document.createElement('th');
        cell5.textContent = 'Giá';
        newRow.appendChild(cell5);
        var cell6 = document.createElement('th');
        cell6.textContent = 'Khuyến mãi';
        newRow.appendChild(cell6);
        var cell7 = document.createElement('th');
        cell7.textContent = 'Giá mới';
        newRow.appendChild(cell7);
        var cell8 = document.createElement('th');
        cell8.textContent = 'Số lượng';
        newRow.appendChild(cell8);
        var cell9 = document.createElement('th');
        cell9.textContent = 'Mô tả';
        newRow.appendChild(cell9);
        var cell10 = document.createElement('th');
        cell10.textContent = 'Ảnh';
        newRow.appendChild(cell10);
        var cell11 = document.createElement('th');
        cell11.textContent = 'Hành động';
        newRow.appendChild(cell11);

        // Thêm hàng mới vào bảng
        productNew.appendChild(newRow);

        data.forEach(element => {

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
                updateProduct(element.id, element.id)
            })
            const button_delete = document.createElement("a");
            if (element.status == 0) {
                button_delete.innerHTML = "<button class=\"button delete\">Ẩn</button>"
            }
            else
            button_delete.innerHTML = "<button class=\"button delete\">Hiện</button>"
            button_delete.addEventListener("click", function(e) {
                e.preventDefault();
                if (this.textContent == "Ẩn") {
                    this.innerHTML = "<button class=\"button delete\">Hiện</button>";
                } else {
                    this.innerHTML = "<button class=\"button delete\">Ẩn</button>";
                }
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

            productNew.append(tr)
        })
    }
    function generatePaging(data) {
        // Số lượng trang
        var totalPages = Math.ceil(data.length / 8);
    
        // Phần tử cha
        var paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination");
    
        // Tạo nút Previous («)
        var previousLink = document.createElement("a");
        previousLink.href = "#";
        previousLink.textContent = "«";
        previousLink.addEventListener("click", function(e) {
            e.preventDefault();
            let a = document.querySelector(".box-pagination .active").getAttribute("name")
            if(a > 1)
                document.querySelector(".box-pagination a[name='" + (parseInt(a) - 1) + "']").click();
            console.log(a);
        })
        paginationContainer.appendChild(previousLink);
        
    
        // Tạo các nút trang
        for (var i = 1; i <= totalPages; i++) {
            (function(pageIndex) { // Sử dụng hàm wrapper để bắt giá trị của i
                var pageLink = document.createElement("a");
                pageLink.textContent = pageIndex;
                pageLink.setAttribute("name",i)
                pageLink.addEventListener("click", function(e) {
                    e.preventDefault();
                    productNew.innerHTML = null;
                    generateProduct(data.slice((pageIndex - 1) * 8, pageIndex * 8));
                    paginationContainer.querySelectorAll(".box-pagination a").forEach(link => {
                        link.classList.remove("active");
                    });
                    pageLink.classList.add("active");
                });
                paginationContainer.appendChild(pageLink);
            })(i);
        }
    
        // Tạo nút Next (»)
        var nextLink = document.createElement("a");
        nextLink.href = "#";
        nextLink.textContent = "»";
        nextLink.addEventListener("click", function(e) {
            e.preventDefault();
            let a = document.querySelector(".box-pagination .active").getAttribute("name")
            if(a < totalPages)
                document.querySelector(".box-pagination a[name='" + (parseInt(a) + 1) + "']").click();
            console.log(a);
        })
        paginationContainer.appendChild(nextLink);
    
        // Ghi đè nội dung của phần tử cha vào .box-pagination
        var boxPagination = document.querySelector(".box-pagination");
        boxPagination.innerHTML = "";
        boxPagination.appendChild(paginationContainer);
        document.querySelector(".box-pagination a[name='1'").click();
    }
    
    function updateProduct(id, product_id) {
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
            update_name.setAttribute("name","update_name")
    
            const update_author = document.createElement("input");
            update_author.setAttribute("type", "text");
            update_author.classList.add("box")
            update_author.setAttribute("required",true)
            update_author.setAttribute("placeholder","Tác giả")
            update_author.setAttribute("value",product.author);
            update_author.setAttribute("name", "update_author")
    
            const update_category = document.createElement("select");
            update_category.setAttribute("name","update_category")
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
                        option.setAttribute("value", element.id)
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
            inputFile.addEventListener("change", function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();

                    reader.onload = function(e) {
                    img.src = e.target.result;
                    img.classList.add('active');
                    };

                    reader.readAsDataURL(file);
                }
            })
    
            const inputSubmit = document.createElement("input");
            inputSubmit.setAttribute("type", "button");
            inputSubmit.setAttribute("value", "Cập nhật");
            inputSubmit.setAttribute("name", "update_product");
            inputSubmit.classList.add("btn");
            inputSubmit.addEventListener("click", function() {
                const name = $("input[name='update_name']").val();
                const author = $("input[name='update_author']").val();
                const category = $("select[name='update_category']").val();
                const price = $("input[name='update_price']").val();
                const discount = $("input[name='update_discount']").val();
                const quantity = $("input[name='update_quantity']").val();
                const describe = $("input[name='update_describe']").val();
                const img = $("input[name='update_image']").val();

                let image = (img.split("\\").pop() == "" ? product.image:img.split("\\").pop())

                let formData_2 = {
                    id: product_id,
                    name: name,
                    author: author,
                    price: price,
                    discount: discount,
                    categoryId: category,
                    quantity: quantity,
                    describes: describe,
                    image: image
                }

                console.log(formData_2)

                
                $.ajax({
                    type: 'PUT', // Phương thức gửi request
                    url: 'http://localhost:8080/products', // Địa chỉ URL của endpoint server
                    data: JSON.stringify(formData_2), // Dữ liệu gửi đi
                    contentType:"application/json; charset=utf-8",
                    xhrFields: {
                        withCredentials: true // Thêm withCredentials vào XHR
                    },
                    success: function(response) {
                        console.log(response)
                        $('.message span').html("Cập nhật thành công!")
                        $('.message').show()
        
                        setTimeout(function() {
                          $('.message').hide()
                          location.reload(true);
                        }, 2000);
                    },
                    error: function(xhr, status, error) {
                        location.reload(true);
                    }
                });

                var formData = new FormData();
                var fileInput = document.querySelector("input[name='update_image']"); // giả sử 'fileInput' là id của thẻ input type="file"
                // Lấy file từ input và thêm vào FormData
                formData.append('image', fileInput.files[0]);

                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:5500/bookstore/client/upload_image.php',
                    data: formData,
                    processData: false, // Không xử lý dữ liệu
                    contentType: false, // Không đặt Content-Type header
                    xhrFields: {
                    withCredentials: true
                    },
                    success: function(response) {
                        console.log(response)
                    },
                    error: function(xhr, status, error) {
                        console.log(status)
                    }
                });
            })
    
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
            },
            error: function(xhr, status, error) {
                console.log(status)
            }
        });
    }
    function generateCategory() {
        $.ajax({
            type: 'GET', // Phương thức gửi request
            url: 'http://localhost:8080/category/all/1', // Địa chỉ URL của endpoint server
            xhrFields: {
                withCredentials: true // Thêm withCredentials vào XHR
            },
            success: function(response) {
                response.forEach(item => {
                    var divElement = document.createElement("div");
                    divElement.classList.add("child");
                    var paragraphElement = document.createElement("p");
                    paragraphElement.innerText = item.name;
                    divElement.appendChild(paragraphElement);
                    divElement.addEventListener("click", function() {
                        //Load product và sách mới nhất
                        sessionStorage.setItem("category_id", item.id);
                        $.get('http://localhost:8080/products/byCategory2?category_id='+item.id, function(data) {
                            productNew.innerHTML = null;
                            generatePaging(data);
                        })
                        var elements = document.querySelectorAll(".scroll-images > *");
    
                        // Lặp qua từng phần tử con và đặt nền
                        elements.forEach(function(element) {
                            element.style.background = "white";
                            element.style.color = "black"
                        })
                        this.style.backgroundColor = "#f05123";
                        this.style.color = "white"
                    })
                    document.querySelector(".scroll-images").appendChild(divElement);
                    document.querySelector(".scroll-images > .child:first-child").click()
                })
            },
            error: function(xhr, status, error) {
            }
        });
    }
    generateCategory()