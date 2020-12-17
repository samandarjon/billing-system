package uz.tuit.supermarket_billing_system.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dates {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Timestamp start;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Timestamp end;
}
