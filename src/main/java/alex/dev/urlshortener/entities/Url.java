package alex.dev.urlshortener.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table(name= "url")
@Getter
@Setter
@NoArgsConstructor
public class Url {

    @Id
    @Column(length = 7, nullable = false, updatable= false)
    private String id;

    @Column(name = "original_link", nullable = false, length = 2048)
    private String originalLink;

    @Column(name = "num_click", nullable = false)
    private Integer numClick;

    @Column(name = "expiration")
    private LocalDate expiration;

    @Column(name = "link_password")
    private String linkPassword;


}
