package uz.tuit.supermarket_billing_system.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import uz.tuit.supermarket_billing_system.entity.*;
import uz.tuit.supermarket_billing_system.projection.ProductProjection;

@Configuration
public class ExposeEntityIdRestMvcConfiguration implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Attachment.class,
                AttachmentContent.class,
                BillingPrice.class,
                Invoice.class,
                Order.class,
                ProductProjection.class
        );
        cors.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "DELETE", "PUT");
    }
}
