package uz.tuit.supermarket_billing_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uz.tuit.supermarket_billing_system.entity.Order;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("select o from orders o where o.createdAt>=:start and o.createdAt<=:end")
    List<Order> getAllOrders(@Param("start") Timestamp start, @Param("end") Timestamp end);
}
