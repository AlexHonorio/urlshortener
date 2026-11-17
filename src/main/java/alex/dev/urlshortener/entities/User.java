package alex.dev.urlshortener.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name="user_name", nullable = false, unique = true, length = 30)
    private String userName;

    @Column(name="email", nullable = false, unique = true, length = 254)
    private String userEmail;

    @Column(name="password", nullable = false, length = 255)
    private String passwordHash;
}
