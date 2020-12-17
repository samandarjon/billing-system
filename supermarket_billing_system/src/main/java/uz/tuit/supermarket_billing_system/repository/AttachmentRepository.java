package uz.tuit.supermarket_billing_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.stereotype.Repository;
import uz.tuit.supermarket_billing_system.entity.Attachment;
import uz.tuit.supermarket_billing_system.entity.Order;

@Repository
@RepositoryRestResource(path = "attachmentsContent")
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
}
