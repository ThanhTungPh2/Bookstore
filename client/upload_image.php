<?php
// Kiểm tra xem người dùng đã gửi dữ liệu lên chưa
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Đảm bảo rằng tệp đã được gửi lên
    if (isset($_FILES["image"])) {
        // Thư mục đích để lưu trữ ảnh (đảm bảo bạn cung cấp đúng đường dẫn)
        $destinationFolder = "./uploaded_img/";

        // Tên tệp ảnh sau khi lưu
        $imageName = $_FILES["image"]["name"];

        // Đường dẫn đến thư mục đích
        $destinationPath = $destinationFolder . $imageName;

        // Di chuyển tệp từ thư mục tạm thời đến thư mục đích
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $destinationPath)) {
            echo "Image uploaded successfully!";
        } else {
            echo "Failed to upload image!";
        }
    } else {
        echo "No image uploaded!";
    }
} else {
    echo "Invalid request!";
}
?>
