package fr.alexisvachard.authenticationpoc.web.secure;

import fr.alexisvachard.authenticationpoc.config.properties.JwtProperties;
import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.service.secure.AccountService;
import fr.alexisvachard.authenticationpoc.web.secure.dto.account.UpdatePasswordRequestDto;
import freemarker.template.TemplateException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping(path = "/update-password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody UpdatePasswordRequestDto updatePasswordRequest, HttpServletRequest req) throws AppException, IOException, TemplateException {

        String jwt = req.getHeader("authorization").substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(jwt).getBody();

        return accountService.updatePassword(updatePasswordRequest, (String) claims.get("username"));
    }
}
