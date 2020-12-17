package uz.tuit.supermarket_billing_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.tuit.supermarket_billing_system.entity.audit.UserDateAudit;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "orders")
public class Order extends UserDateAudit {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Product product;

    @Column(nullable = false)
    private double amount;

}
