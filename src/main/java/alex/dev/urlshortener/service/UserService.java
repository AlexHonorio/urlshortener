package alex.dev.urlshortener.service;

import alex.dev.urlshortener.dto.RegisterRequest;
import alex.dev.urlshortener.dto.UserResponse;
import alex.dev.urlshortener.entities.User;
import alex.dev.urlshortener.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import javax.net.ssl.HttpsURLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse register (RegisterRequest request) {

        String userName = request.userName().trim();
        String userEmail = request.userEmail().trim().toLowerCase(Locale.ROOT);
        String password = request.password();

        if(userRepository.existsByUserName(userName)){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }

        if(userRepository.existsByUserEmail(userEmail)){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }

        int passwordBytes = password.getBytes(StandardCharsets.UTF_8).length;

        if(passwordBytes > 72 ){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password exceeds the maximum supported length");
        }

        User user = new User();
        user.setUserName(userName);
        user.setUserEmail(userEmail);
        user.setPasswordHash(passwordEncoder.encode(password));

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getUserId(),
                savedUser.getUserName(),
                savedUser.getUserEmail()
        );

    }


}
