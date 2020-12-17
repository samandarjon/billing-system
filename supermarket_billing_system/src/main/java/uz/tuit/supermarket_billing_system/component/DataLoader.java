package uz.tuit.supermarket_billing_system.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import uz.tuit.supermarket_billing_system.entity.Role;
import uz.tuit.supermarket_billing_system.entity.User;
import uz.tuit.supermarket_billing_system.repository.RoleRepository;
import uz.tuit.supermarket_billing_system.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Value("${spring.datasource.initialization-mode}")
    private String modeInitial;

    @Override
    public void run(String... args) throws Exception {
        if (modeInitial.equals("always")) {
            List<Role> roles = roleRepository.findAll();
            User admin = new User(null,
                    "Admin",
                    "Admin",
                    passwordEncoder.encode("1234"),
                    "admin",
                    roles.stream().filter(role -> role.getRoleName().name().equals("ROLE_ADMIN")).collect(Collectors.toSet())
            );
            User manager = new User(null,
                    "Manager",
                    "Manager",
                    passwordEncoder.encode("1234"),
                    "manager",
                    roles.stream().filter(role -> role.getRoleName().name().equals("ROLE_MANAGER")).collect(Collectors.toSet())
            );
            User seller = new User(null,
                    "Seller",
                    "Seller",
                    passwordEncoder.encode("1234"),
                    "seller",
                    roles.stream().filter(role -> role.getRoleName().name().equals("ROLE_SELLER")).collect(Collectors.toSet())
            );
            User superUser = new User(null,
                    "Super User",
                    "Super User",
                    passwordEncoder.encode("1234"),
                    "superuser",
                    new HashSet<>(roles)
            );

            userRepository.save(admin);
            userRepository.save(manager);
            userRepository.save(seller);
            userRepository.save(superUser);
        }
    }
}
