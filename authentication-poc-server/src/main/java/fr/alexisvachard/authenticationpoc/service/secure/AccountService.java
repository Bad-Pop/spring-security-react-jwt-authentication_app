package fr.alexisvachard.authenticationpoc.service.secure;

import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.model.User;
import fr.alexisvachard.authenticationpoc.repository.UserRepository;
import fr.alexisvachard.authenticationpoc.service.mail.MailService;
import fr.alexisvachard.authenticationpoc.web.common.dto.ApiResponseDto;
import fr.alexisvachard.authenticationpoc.web.secure.dto.account.UpdatePasswordRequestDto;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;

@Service
public class AccountService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private MailService mailService;

    @Autowired
    public AccountService(UserRepository userRepository, PasswordEncoder passwordEncoder, MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
    }

    public ResponseEntity<?> updatePassword(UpdatePasswordRequestDto updatePasswordRequest, String username) throws AppException, IOException, TemplateException {

        if(!StringUtils.hasText(username)){
            return ResponseEntity.badRequest().body(new ApiResponseDto(false, "Invalid session token !"));
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException("Unable to retrieve this user !"));

        if (passwordEncoder.matches(updatePasswordRequest.getOldPassword(), user.getPassword())) {
            if (updatePasswordRequest.getNewPassword().equals(updatePasswordRequest.getConfirmNewPassword())) {

                user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
                userRepository.save(user);

                mailService.sendPasswordUpdatedNotification(user);
            } else {
                return ResponseEntity.badRequest().body(new ApiResponseDto(false, "New passwords does not match !"));
            }
        } else {
            return ResponseEntity.badRequest().body(new ApiResponseDto(false, "Please verify your password and try again later !"));
        }

        return ResponseEntity.ok().body(new ApiResponseDto(true, "Your password has been changed !"));
    }
}
