package alex.dev.urlshortener.service;

import alex.dev.urlshortener.dto.LoginRequest;
import alex.dev.urlshortener.dto.UserResponse;
import alex.dev.urlshortener.entities.User;
import alex.dev.urlshortener.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;
    private final UserRepository userRepository;
    private final SessionAuthenticationStrategy sessionAuthenticationStrategy;

    public UserResponse login(LoginRequest request,
                              HttpServletRequest httpRequest,
                              HttpServletResponse httpResponse){

        String email = request.userEmail().trim().toLowerCase();

        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email,request.password())
            );

        } catch (AuthenticationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");

        }

        SecurityContext context = SecurityContextHolder.createEmptyContext();

        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        securityContextRepository.saveContext(context, httpRequest, httpResponse);

        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));


        sessionAuthenticationStrategy.onAuthentication(
                authentication,
                httpRequest,
                httpResponse
        );

        return new UserResponse(
                user.getUserId(),
                user.getUserName(),
                user.getUserEmail()
        );
    }

    public UserResponse getCurrentUser(Authentication authentication){

        String email = authentication.getName();

        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));



        return new UserResponse(
                user.getUserId(),
                user.getUserName(),
                user.getUserEmail()
        );
    }

}
