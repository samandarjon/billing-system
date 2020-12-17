package uz.tuit.supermarket_billing_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.tuit.supermarket_billing_system.entity.User;
import uz.tuit.supermarket_billing_system.payload.ApiResponse;
import uz.tuit.supermarket_billing_system.payload.LoginDto;
import uz.tuit.supermarket_billing_system.payload.TokenResponse;
import uz.tuit.supermarket_billing_system.repository.UserRepository;
import uz.tuit.supermarket_billing_system.security.JwtAuthenticationProvider;
import uz.tuit.supermarket_billing_system.service.OrderService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            User user = userRepository.findByUsername(loginDto.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("Bunday user mavjud emas"));
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getUsername(), loginDto.getPassword()));
            String token = "Bearer " + jwtAuthenticationProvider.generateToken(user);
            return ResponseEntity.ok(new TokenResponse(token));

        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ApiResponse("Username yoki parol xato.", 401));
        }
    }

}
