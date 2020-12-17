package uz.tuit.supermarket_billing_system.controller;

import com.lowagie.text.DocumentException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.tuit.supermarket_billing_system.entity.BillingPrice;
import uz.tuit.supermarket_billing_system.entity.Order;
import uz.tuit.supermarket_billing_system.payload.BillingDto;
import uz.tuit.supermarket_billing_system.payload.Dates;
import uz.tuit.supermarket_billing_system.payload.OrderDto;
import uz.tuit.supermarket_billing_system.service.OrderService;

import javax.validation.Valid;
import java.io.IOException;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@RequestMapping("/api/orders")
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @SneakyThrows
    @PostMapping
    public ResponseEntity<?> addOrder(@Valid @RequestBody List<OrderDto> orderDto) throws IOException, DocumentException {
        return orderService.addOrder(orderDto);
    }

    @PostMapping("/billing")
    public ResponseEntity<?> getOrdersWithData(@Valid @RequestBody Dates dates) {
        List<Order> orders = orderService.getOrdersWithDate(dates);
        double sum = 0;
        for (Order order : orders) {
            double productPrice = order.getProduct().getPrice();
            for (BillingPrice billingPrice : order.getProduct().getBillingPrices()) {
                productPrice += (order.getProduct().getPrice() * billingPrice.getPrice() * 0.01);
            }
            sum += order.getAmount() * (productPrice - productPrice * (order.getProduct().getDiscount() * 0.01));

        }
        NumberFormat format = NumberFormat.getInstance(new Locale("sk", "SK"));
        BillingDto billingDto = new BillingDto(orders, format.format(sum) + " so`m");
        return ResponseEntity.ok(billingDto);
    }


}
