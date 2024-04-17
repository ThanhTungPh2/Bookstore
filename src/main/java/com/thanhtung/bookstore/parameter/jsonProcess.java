package com.thanhtung.bookstore.parameter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class jsonProcess {

    public static final ObjectMapper objectMapper;
    static {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    public static String objectToJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static JsonNode objectToJsonNode(Object object) {
        try {
            // Chuyển đối tượng thành JsonNode
            return objectMapper.valueToTree(object);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static boolean isValidJson(String jsonString) {
        try {
            objectMapper.readTree(jsonString);
            return true;
        } catch (JsonProcessingException e) {
            return false;
        }
    }

    public static JsonNode updateJsonProperty(JsonNode rootNode, String propertyName, JsonNode newValue) {
        try {
            // Bước 1: Thực hiện thay đổi vào thuộc tính mong muốn
            ((ObjectNode) rootNode).set(propertyName, newValue);

            // Bước 2: Trả về JsonNode đã được cập nhật
            return rootNode;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static JsonNode renameJsonKeys(JsonNode rootNode, String oldKeyName, String newKeyName) {
        try {
        // Duyệt qua từng phần tử trong mảng
        for (JsonNode elementNode : rootNode) {
                ObjectNode objectNode = (ObjectNode) elementNode;
                // Kiểm tra xem khóa cũ có tồn tại trong phần tử không
                if (objectNode.has(oldKeyName)) {
                    // Lấy giá trị của khóa cũ
                    JsonNode propertyNode = objectNode.get(oldKeyName);
                    
                    // Xóa khóa cũ
                    objectNode.remove(oldKeyName);
                    
                    // Thêm khóa mới với giá trị của khóa cũ
                    objectNode.set(newKeyName, propertyNode);
                }
            }
            // Trả về JsonNode đã được cập nhật
            return rootNode;
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
