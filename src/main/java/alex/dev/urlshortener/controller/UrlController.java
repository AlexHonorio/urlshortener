package alex.dev.urlshortener.controller;

import alex.dev.urlshortener.dto.ShortenUrlRequest;
import alex.dev.urlshortener.dto.ShortenUrlResponse;
import alex.dev.urlshortener.entities.Url;
import alex.dev.urlshortener.repository.UrlRepository;
import alex.dev.urlshortener.service.UrlService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
//@RequestMapping("/url") REMOVI PARA QUE O LINK FIQUE MAIS LEGIVEL
public class UrlController {

    private final UrlService urlService;

    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    @PostMapping("/shorten")
    public ResponseEntity<ShortenUrlResponse> shortenUrl(@RequestBody ShortenUrlRequest request) {

        Url url = urlService.shortenUrl(request.url(), request.expiration());

        String shortUrl = baseUrl.replaceAll("/+$", "") + "/" + url.getId();

        ShortenUrlResponse response = new ShortenUrlResponse(
                url.getId(),
                url.getOriginalLink(),
                shortUrl,
                url.getNumClick(),
                url.getExpiration()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping("/{id:[a-zA-Z0-9]{1,7}}")
    public ResponseEntity<Void> redirect(@PathVariable String id){

        String originalUrl = urlService.resolveUrl(id);

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .header(HttpHeaders.LOCATION, originalUrl)
                .build();
    }





}
