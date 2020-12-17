package uz.tuit.supermarket_billing_system.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    @NotBlank(message = "Username bo`sh bo`lishi mumkin emas.")
    private String username;
    @NotBlank(message = "Password bo`sh bo`lishi mumkin emas.")
    private String password;
}
