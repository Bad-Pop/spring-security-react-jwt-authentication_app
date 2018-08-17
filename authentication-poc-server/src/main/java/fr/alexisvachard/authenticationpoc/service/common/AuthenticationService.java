package fr.alexisvachard.authenticationpoc.service.common;

import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.model.Role;
import fr.alexisvachard.authenticationpoc.model.RoleName;
import fr.alexisvachard.authenticationpoc.model.User;
import fr.alexisvachard.authenticationpoc.repository.RoleRepository;
import fr.alexisvachard.authenticationpoc.repository.UserRepository;
import fr.alexisvachard.authenticationpoc.security.jwt.JwtTokenProvider;
import fr.alexisvachard.authenticationpoc.web.common.dto.ApiResponseDto;
import fr.alexisvachard.authenticationpoc.web.secure.dto.JwtAuthenticationResponseDto;
import fr.alexisvachard.authenticationpoc.web.common.dto.auth.LoginRequestDto;
import fr.alexisvachard.authenticationpoc.web.common.dto.auth.RegisterRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthenticationService {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public ResponseEntity<?> authenticateUser(LoginRequestDto loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtTokenProvider.generateToken(authentication, loginRequest);

        return ResponseEntity.ok(new JwtAuthenticationResponseDto(jwt));
    }

    public ResponseEntity<?> registerUser(RegisterRequestDto registerRequest) throws AppException {

        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return new ResponseEntity<>(
                    new ApiResponseDto(
                            false,
                            "This username is already taken !"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return new ResponseEntity<>(
                    new ApiResponseDto(
                            false,
                            "This email adress is already taken !"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword())
        );

        Role userRole = roleRepository.findByRoleName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("Unable to retrieve user role !"));

        user.setRoles(Collections.singleton(userRole));

        userRepository.save(user);

        //TODO SEND EMAIL CINFIRMATION (THREAD)

        return ResponseEntity.ok()
                .body(new ApiResponseDto(true, "User registered successfully !"));
    }
}
