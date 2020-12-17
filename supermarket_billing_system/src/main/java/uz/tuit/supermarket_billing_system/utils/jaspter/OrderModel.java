package uz.tuit.supermarket_billing_system.utils.jaspter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderModel {
    private Long id;
    private String cratedAt;
    private List<OrderEntryModel> entries;
}
