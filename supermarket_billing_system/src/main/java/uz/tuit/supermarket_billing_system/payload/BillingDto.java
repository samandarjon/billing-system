package uz.tuit.supermarket_billing_system.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.tuit.supermarket_billing_system.entity.Order;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillingDto {
    private List<Order> orders;
    private String profit;
}
