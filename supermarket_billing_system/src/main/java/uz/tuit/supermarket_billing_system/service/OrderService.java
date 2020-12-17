package uz.tuit.supermarket_billing_system.service;

import com.lowagie.text.DocumentException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import uz.tuit.supermarket_billing_system.entity.BillingPrice;
import uz.tuit.supermarket_billing_system.entity.Invoice;
import uz.tuit.supermarket_billing_system.entity.Order;
import uz.tuit.supermarket_billing_system.entity.Product;
import uz.tuit.supermarket_billing_system.payload.Dates;
import uz.tuit.supermarket_billing_system.payload.OrderDto;
import uz.tuit.supermarket_billing_system.repository.InvoiceRepository;
import uz.tuit.supermarket_billing_system.repository.OrderRepository;
import uz.tuit.supermarket_billing_system.repository.ProductRepository;
import uz.tuit.supermarket_billing_system.utils.jaspter.OrderEntryModel;
import uz.tuit.supermarket_billing_system.utils.jaspter.OrderModel;

import javax.transaction.Transactional;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

@Service
public class OrderService {
    private static final Logger logger = LogManager.getLogger(OrderService.class);

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Transactional
    public ResponseEntity<?> addOrder(List<OrderDto> orderDtos) throws IOException, DocumentException {

        List<Product> products = productRepository.findAllById(orderDtos
                .stream().
                        flatMapToLong(orderDto ->
                                LongStream.of(orderDto.getProductId()))
                .boxed()
                .collect(Collectors.toList()));

        LinkedList<Order> orders = new LinkedList<>();
        for (Product product : products) {

            Order order = new Order(null, product,
                    orderDtos.stream()
                            .filter(orderDto -> orderDto.getProductId().equals(product.getId())).findFirst().get().getAmount());
            orders.add(order);
        }
        orderRepository.saveAll(orders);
        Invoice invoice = invoiceRepository.save(new Invoice(null, orders));
        List<Order> invoiceOrders = invoice.getOrders();
        LinkedList<OrderEntryModel> orderEntryModels = new LinkedList<>();
        for (Order invoiceOrder : invoiceOrders) {
            OrderEntryModel orderEntryModel = new OrderEntryModel();
            orderEntryModel.setProductName(invoiceOrder.getProduct().getName());
            orderEntryModel.setQuantity(invoiceOrder.getAmount());
            double price = invoiceOrder.getProduct().getPrice();
            for (BillingPrice billingPrice : invoiceOrder.getProduct().getBillingPrices()) {
                //Billing price foizda ko`ratiladi. Misol uchun QQS 25% bo`ladi. Listda boshqa soliqlarham foizda beriladi.
                price = price * 0.01 * billingPrice.getPrice();
            }
            //mahsuolt narxidan chegirmalar olib tashlanadi.
            price = price * (1 - (0.01 * invoiceOrder.getProduct().getDiscount()));
            orderEntryModel.setPrice(price);
            orderEntryModel.setType(invoiceOrder.getProduct().getType());
            orderEntryModels.add(orderEntryModel);
        }
        OrderModel order = new OrderModel(invoice.getId(), new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(invoice.getCreatedAt()), orderEntryModels);
        logger.info("Invoice generated successfully...");
        return ResponseEntity.ok(order);
    }

    public List<Order> getOrdersWithDate(Dates dates) {
        System.out.println(dates.getStart());
        System.out.println(new Timestamp(dates.getEnd().getTime() + 24 * 3600));
        return orderRepository.getAllOrders(dates.getStart(), dates.getEnd());
    }


}