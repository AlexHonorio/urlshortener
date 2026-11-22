package alex.dev.urlshortener.controller;

import alex.dev.urlshortener.dto.LoginRequest;
import alex.dev.urlshortener.dto.UserResponse;
import alex.dev.urlshortener.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody LoginRequest request,
                                              HttpServletRequest httpRequest,
                                              HttpServletResponse httpResponse) {

        UserResponse response = authService.login(request, httpRequest, httpResponse);

        return ResponseEntity.ok(response);

    }


    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {

        UserResponse response = authService.getCurrentUser(authentication);
        return ResponseEntity.ok(response);
    }
}
