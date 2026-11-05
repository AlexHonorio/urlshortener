package alex.dev.urlshortener.dto;


import java.time.LocalDate;

public record ShortenUrlResponse(String id,
                                 String originalUrl,
                                 String shortUrl,
                                 Integer numClick,
                                 LocalDate expiration) {
}
