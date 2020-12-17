package uz.tuit.supermarket_billing_system.projection;

import org.springframework.data.rest.core.config.Projection;
import uz.tuit.supermarket_billing_system.entity.BillingPrice;
import uz.tuit.supermarket_billing_system.entity.Product;

import java.util.List;

@Projection(name = "product", types = {Product.class})
public interface ProductProjection {
    Long getId();

    String getName();

    double getPrice();

    String getInfo();

    String getType();

    double getDiscount();

    List<BillingPrice> getBillingPrices();

}
