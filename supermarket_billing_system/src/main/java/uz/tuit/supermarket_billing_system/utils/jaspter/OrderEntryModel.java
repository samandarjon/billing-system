package uz.tuit.supermarket_billing_system.utils.jaspter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderEntryModel {
    private String productName;
    private double quantity;
    private double price;
    private String type; //kg, m, dona
}
