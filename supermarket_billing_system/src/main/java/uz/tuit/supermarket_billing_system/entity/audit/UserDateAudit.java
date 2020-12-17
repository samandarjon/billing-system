package uz.tuit.supermarket_billing_system.entity.audit;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class UserDateAudit extends DateAudit {
    @CreatedBy
    private Long createdBy;
    @LastModifiedBy
    private Long updatedBy;
}
