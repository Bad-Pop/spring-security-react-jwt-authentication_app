package fr.alexisvachard.authenticationpoc.web.secure;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import fr.alexisvachard.authenticationpoc.config.properties.JwtProperties;
import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.model.User;
import fr.alexisvachard.authenticationpoc.repository.UserRepository;
import fr.alexisvachard.authenticationpoc.service.secure.AccountService;
import fr.alexisvachard.authenticationpoc.web.common.dto.ApiResponseDto;
import fr.alexisvachard.authenticationpoc.web.secure.dto.account.TwoFAStatusDto;
import fr.alexisvachard.authenticationpoc.web.secure.dto.account.UpdatePasswordRequestDto;
import freemarker.template.TemplateException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping(path = "/api/secure/account")
@CrossOrigin(maxAge = 3600)
public class AccountController {

    @Autowired
    private JwtProperties jwtProperties;

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/settings/update-password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody UpdatePasswordRequestDto updatePasswordRequest, HttpServletRequest req) throws AppException, IOException, TemplateException {

        String jwt = req.getHeader("authorization").substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(jwt).getBody();

        return accountService.updatePassword(updatePasswordRequest, (String) claims.get("username"));
    }

    @GetMapping(path = "/settings/2fa/status")
    public ResponseEntity<?> check2FAUsage(HttpServletRequest req) throws AppException{

        String jwt = req.getHeader("authorization").substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(jwt).getBody();

        User user = userRepository.findByUsername(claims.get("username").toString())
                .orElseThrow(() -> new AppException("Unable to retrieve this user !"));

        return new ResponseEntity<>(new TwoFAStatusDto(user.isUsingTwoFA()), HttpStatus.OK);
    }

    @GetMapping(path = "/settings/2fa/enable")
    public ResponseEntity<?> enable2FAAuthentication (HttpServletRequest req) throws AppException {

        String jwt = req.getHeader("authorization").substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(jwt).getBody();

        User user = userRepository.findByUsername(claims.get("username").toString())
                .orElseThrow(() -> new AppException("Unable to retrieve this user !"));

        user.setUsingTwoFA(true);

        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        final GoogleAuthenticatorKey key = gAuth.createCredentials();

        user.setTwoFASecret(key.getKey());

        userRepository.save(user);

        return new ResponseEntity<>(new ApiResponseDto(true, "Two Factor Authentication is now enabled !"), HttpStatus.OK);
    }

    @GetMapping(path = "/settings/2fa/disable")
    public ResponseEntity<?> disable2FAAuthentication (HttpServletRequest req) throws AppException {

        String jwt = req.getHeader("authorization").substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(jwt).getBody();

        User user = userRepository.findByUsername(claims.get("username").toString())
                .orElseThrow(() -> new AppException("Unable to retrieve this user !"));

        user.setUsingTwoFA(false);
        user.setTwoFASecret("");

        userRepository.save(user);

        return new ResponseEntity<>(new ApiResponseDto(true, "Two Factor Authentication is now disabled !"), HttpStatus.OK);
    }
}
