package alex.dev.urlshortener.service;

import alex.dev.urlshortener.Base62;
import alex.dev.urlshortener.entities.Url;
import alex.dev.urlshortener.repository.UrlRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.time.LocalDate;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class UrlService {

    private final UrlRepository urlRepository;


    public Url shortenUrl(String originalLink, LocalDate expiration) {

        validateUrl(originalLink);
        
        if(expiration != null && !expiration.isAfter(LocalDate.now())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid expiration date");
        }


        Url url = new Url();
        url.setId(generateUniqueId());
        url.setOriginalLink(originalLink.trim());
        url.setNumClick(0);
        url.setExpiration(expiration);

        return urlRepository.save(url);

    }

    private String generateUniqueId(){
        String id;

        do {
            id = Base62.generateCode();
        } while (urlRepository.existsById(id));

        return id;
    }

    private void validateUrl(String originalLink){
        if(originalLink == null || originalLink.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid url link");
        }

        try{
            URI uri = URI.create(originalLink.trim());
            String scheme = uri.getScheme();

            if(uri.getHost() == null
                || scheme == null
                || !(scheme.equalsIgnoreCase("http")
                || scheme.equalsIgnoreCase("https"))){

                throw new IllegalArgumentException();
            }
        }catch (IllegalArgumentException exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter a valid HTTP or HTTPS URL");
        }
    }


    @Transactional
    public String resolveUrl(String id){

        Url url = urlRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Short url not found"));


        if(url.getExpiration() != null && !url.getExpiration().isAfter(LocalDate.now())){
            throw new ResponseStatusException(HttpStatus.GONE, "This link has expired");
        }

        url.setNumClick(url.getNumClick() + 1);
        urlRepository.save(url);
        return url.getOriginalLink();
    }

}
