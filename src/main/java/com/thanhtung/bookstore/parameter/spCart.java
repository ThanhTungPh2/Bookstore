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
    private Integer userId;
    private Integer productId;
    private Integer quantity;
}
