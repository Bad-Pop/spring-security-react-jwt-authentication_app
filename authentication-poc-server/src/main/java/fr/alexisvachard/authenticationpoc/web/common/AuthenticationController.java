package fr.alexisvachard.authenticationpoc.web.common;

import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.service.common.AuthenticationService;
import fr.alexisvachard.authenticationpoc.web.dto.request.LoginRequestDto;
import fr.alexisvachard.authenticationpoc.web.dto.request.RegisterRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/public/auth")
@CrossOrigin(maxAge = 3600)
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping(path = "/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequest) throws AppException {
        return authenticationService.authenticateUser(loginRequest);
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDto registerRequest) throws AppException {
        return authenticationService.registerUser(registerRequest);
    }
}
