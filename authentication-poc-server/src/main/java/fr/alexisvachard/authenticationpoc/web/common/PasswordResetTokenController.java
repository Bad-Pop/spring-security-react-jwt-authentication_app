package fr.alexisvachard.authenticationpoc.web.common;

import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.service.common.PasswordResetTokenService;
import fr.alexisvachard.authenticationpoc.web.common.dto.ResetPasswordRequestDto;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping(path = "/api/public/reset-password")
@CrossOrigin(maxAge = 3600)
public class PasswordResetTokenController {

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    @GetMapping
    public ResponseEntity<?> resetPassword(@RequestParam("email") final String email) throws AppException, TemplateException, IOException {

        if(!StringUtils.hasText(email)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return passwordResetTokenService.createPasswordResetToken(email);
    }

    @PostMapping
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequestDto req) throws AppException, IOException, TemplateException{

        if(StringUtils.hasText(req.getPassword())
                && StringUtils.hasText(req.getConfirmPassword())
                && StringUtils.hasText(req.getToken())
                && req.getId() >= 0){

                return passwordResetTokenService.resetPassword(req);
        }

        throw new AppException("Invalid request. Please try again !");
    }
}
