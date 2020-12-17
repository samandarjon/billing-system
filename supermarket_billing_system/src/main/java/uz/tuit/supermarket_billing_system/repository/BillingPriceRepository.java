package uz.tuit.supermarket_billing_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import uz.tuit.supermarket_billing_system.entity.BillingPrice;

@Repository
@RepositoryRestResource(path = "billingPrice")
public interface BillingPriceRepository extends JpaRepository<BillingPrice, Long> {
}
