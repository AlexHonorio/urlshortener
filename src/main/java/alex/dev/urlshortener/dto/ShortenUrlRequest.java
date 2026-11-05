package alex.dev.urlshortener.dto;

import java.time.LocalDate;

public record ShortenUrlRequest(String url, LocalDate expiration) {
}
