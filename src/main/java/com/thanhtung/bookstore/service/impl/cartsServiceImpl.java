package com.thanhtung.bookstore.service.impl;

import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.thanhtung.bookstore.model.Carts;
import com.thanhtung.bookstore.parameter.spCart;
import com.thanhtung.bookstore.repository.cartsRepository;
import com.thanhtung.bookstore.service.cartService;
import com.thanhtung.bookstore.service.productsService;
import com.thanhtung.bookstore.parameter.jsonProcess;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class cartsServiceImpl implements cartService {

    private final cartsRepository cRepository;
    private final productsService pService;
    final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String addToCart(spCart spc) {
        cRepository.THEM_SACH(spc.getUserId(), spc.getProductId(), spc.getQuantity());
        return null;
    }

    @Override
    public String deleteToCart(spCart spc) {
        cRepository.XOA_SACH(spc.getUserId(), spc.getProductId());
        return null;
    }

    @Override
    public String deleteAllCart(spCart spCart) {
        cRepository.XOA_TAT_CA(spCart.getUserId());
        return null;
    }

    @Override
    public String updateToCart(spCart spCart) {
        cRepository.UPDATE_SACH(spCart.getUserId(), spCart.getProductId(), spCart.getQuantity());
        return null;
    }

    @Override
    public String getAllCart(int id) {
        List<Carts> lc = cRepository.findAllByUserId(id);
        
        ObjectNode result = objectMapper.createObjectNode();
        result.put("orderId", lc.get(0).getOrderId());
        result.put("userId",  lc.get(0).getUserId());
        // Khởi tạo một ArrayNode mới
        ArrayNode product = objectMapper.createArrayNode();
        result.set("product", product);
    
        for (Carts item : lc) {
            // Lấy giá trị productId từ JsonNode và chuyển đổi thành kiểu int
            int productId = item.getProductId();
    
            // Gọi phương thức getProducts với productId đã lấy được
            ObjectNode updatedProduct = (ObjectNode)jsonProcess.objectToJsonNode(pService.getProducts(productId));
            updatedProduct.remove("quantity");
            updatedProduct.remove("newPrice");
            updatedProduct.remove("price");
            updatedProduct.put("quantity", item.getQuantity());
            updatedProduct.put("price", item.getPrice());
            // Cập nhật thuộc tính "product" trong item và thêm vào result
            product.add(updatedProduct);
        }
    
        // Chuyển đổi result thành chuỗi JSON và trả về
        return jsonProcess.objectToJson(result);
    }

    
    
}
