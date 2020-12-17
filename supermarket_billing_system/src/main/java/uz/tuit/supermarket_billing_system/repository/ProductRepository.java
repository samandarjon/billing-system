package uz.tuit.supermarket_billing_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import uz.tuit.supermarket_billing_system.entity.Product;
import uz.tuit.supermarket_billing_system.projection.ProductProjection;

import java.util.List;

@RepositoryRestResource(path = "products", excerptProjection = ProductProjection.class)
public interface ProductRepository extends JpaRepository<Product, Long> {
    @RestResource(path = "/name", rel = "name")
    List<Product> findAllByNameStartingWith(@Param("name") String name);

}
