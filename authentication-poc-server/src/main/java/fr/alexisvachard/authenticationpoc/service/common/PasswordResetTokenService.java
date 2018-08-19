package fr.alexisvachard.authenticationpoc.service.common;

import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.model.PasswordResetToken;
import fr.alexisvachard.authenticationpoc.model.User;
import fr.alexisvachard.authenticationpoc.repository.PasswordResetTokenRepository;
import fr.alexisvachard.authenticationpoc.repository.UserRepository;
import fr.alexisvachard.authenticationpoc.service.mail.MailService;
import fr.alexisvachard.authenticationpoc.web.common.dto.ApiResponseDto;
import fr.alexisvachard.authenticationpoc.web.common.dto.ResetPasswordRequestDto;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Calendar;
import java.util.UUID;

@Service
public class PasswordResetTokenService {

    private UserRepository userRepository;
    private PasswordResetTokenRepository passwordResetTokenRepository;
    private MailService mailService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public PasswordResetTokenService(UserRepository userRepository, PasswordResetTokenRepository passwordResetTokenRepository, MailService mailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.mailService = mailService;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> createPasswordResetToken(final String email) throws AppException, TemplateException, IOException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Unable to retrieve this user !"));

        final String token = UUID.randomUUID().toString();

        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(myToken);

        mailService.sendResetPasswordLink(user, token);

        return new ResponseEntity<>(new ApiResponseDto(true, "Your request has been accepted ! If this email address is correct, you will soon receive an email with a link to reset your password."), HttpStatus.OK);
    }

    public ResponseEntity<?> resetPassword(ResetPasswordRequestDto req) throws AppException, TemplateException, IOException {

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(req.getToken())
                .orElseThrow(() -> new AppException("Unable to retrieve this reset password link. Maybe your linke is no longer active"));

        User user = userRepository.findById(resetToken.getUser().getId())
                .orElseThrow(() -> new AppException("Unable to retrieve this user !"));

        if(!req.getId().equals(user.getId())){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Calendar calendar = Calendar.getInstance();
        if ((resetToken.getExpiryDate().getTime() - calendar.getTime().getTime()) <= 0) {
            return new ResponseEntity<>(new ApiResponseDto(false, "This reset password link has expired !"), HttpStatus.BAD_REQUEST);
        }

        if(!req.getPassword().equals(req.getConfirmPassword())){
            return new ResponseEntity<>(new ApiResponseDto(false, "Passwords does not match !"), HttpStatus.BAD_REQUEST);
        }

        passwordResetTokenRepository.delete(resetToken);

        user.setPassword(passwordEncoder.encode(req.getPassword()));
        userRepository.save(user);

        mailService.sendPasswordUpdatedNotification(user);

        return new ResponseEntity<>(new ApiResponseDto(true, "Your password has been changed !"), HttpStatus.OK);
    }
}
