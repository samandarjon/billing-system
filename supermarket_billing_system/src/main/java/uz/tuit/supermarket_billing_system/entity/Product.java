package uz.tuit.supermarket_billing_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.tuit.supermarket_billing_system.entity.audit.DateAudit;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private double price;
    private String info;
    @OneToMany
    private List<BillingPrice> billingPrices;
    private double discount;
    @Column(nullable = false)
    private String type;

}
