package alex.dev.urlshortener.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String,Object>> handleResponseStatusException(
            ResponseStatusException exception){


        return ResponseEntity.status(exception.getStatusCode())
                .body(Map.of(
                        "status",exception.getStatusCode().value(),
                        "message",exception.getReason()
                ));
    }
}
