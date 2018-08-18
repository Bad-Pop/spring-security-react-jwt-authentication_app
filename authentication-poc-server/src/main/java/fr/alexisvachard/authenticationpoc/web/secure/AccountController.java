package fr.alexisvachard.authenticationpoc.web.secure;

import com.google.zxing.WriterException;
import fr.alexisvachard.authenticationpoc.config.properties.JwtProperties;
import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.service.secure.AccountService;
import fr.alexisvachard.authenticationpoc.web.secure.dto.account.EnableTwoFARequestDto;
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


    @PostMapping(path = "/settings/update-password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody UpdatePasswordRequestDto updatePasswordRequest, HttpServletRequest req) throws AppException, IOException, TemplateException {

        String jwt = req.getHeader("authorization").substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(jwt).getBody();

        return accountService.updatePassword(updatePasswordRequest, (String) claims.get("username"));
    }


    @GetMapping(path = "/settings/2fa/status")
    public ResponseEntity<?> check2FAUsage(HttpServletRequest req) throws AppException {

        String jwt = req.getHeader("authorization").substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(jwt).getBody();

        return accountService.check2FAUsage(claims.get("username").toString());
    }


    @PostMapping(path = "/settings/2fa/enable")
    public ResponseEntity<?> enable2FAAuthentication(
            HttpServletRequest req,
            @RequestParam(name = "step", required = false) int step,
            @RequestBody(required = false)EnableTwoFARequestDto enableTwoFARequestDto
            ) throws AppException, WriterException, IOException {

        String jwt = req.getHeader("authorization").substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(jwt).getBody();

        return accountService.enable2FAAuthentication(claims.get("username").toString(), step, enableTwoFARequestDto);
    }


    @GetMapping(path = "/settings/2fa/disable")
    public ResponseEntity<?> disable2FAAuthentication(HttpServletRequest req) throws AppException {

        String jwt = req.getHeader("authorization").substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(jwt).getBody();

        return accountService.disable2FAAuthentication(claims.get("username").toString());
    }
}
