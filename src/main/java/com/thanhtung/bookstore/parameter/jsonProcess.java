package com.thanhtung.bookstore.parameter;
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

    public static ObjectNode objectToObjectNode(Object object) {
        try {
            // Tạo một ObjectNode mới
            ObjectNode objectNode = objectMapper.createObjectNode();
            // Chuyển đối tượng thành ObjectNode và thêm vào ObjectNode mới tạo
            objectMapper.convertValue(object, ObjectNode.class).fields()
                    .forEachRemaining(entry -> objectNode.set(entry.getKey(), entry.getValue()));
            return objectNode;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static ObjectNode jsonToObjectNode(String json) {
        try {
            // Chuyển đổi JSON thành ObjectNode
            return (ObjectNode) objectMapper.readTree(json);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
