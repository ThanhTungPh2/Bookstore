package com.thanhtung.bookstore.parameter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class spCart {
    private int userId;
    private int productId;
    private int quantity;
}
