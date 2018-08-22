package fr.alexisvachard.authenticationpoc.service.secure;

import com.google.zxing.WriterException;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.persistence.model.User;
import fr.alexisvachard.authenticationpoc.persistence.repository.UserRepository;
import fr.alexisvachard.authenticationpoc.service.mail.MailService;
import fr.alexisvachard.authenticationpoc.web.dto.request.EnableTwoFARequestDto;
import fr.alexisvachard.authenticationpoc.web.dto.request.UpdatePasswordRequestDto;
import fr.alexisvachard.authenticationpoc.web.dto.response.ApiResponseDto;
import fr.alexisvachard.authenticationpoc.web.dto.response.EnableTwoFAStepOneResponseDto;
import fr.alexisvachard.authenticationpoc.web.dto.response.TwoFAStatusResponseDto;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private QRCodeGeneratorService qrCodeGeneratorService;

    @Autowired
    public AccountService(UserRepository userRepository, PasswordEncoder passwordEncoder, MailService mailService, QRCodeGeneratorService qrCodeGeneratorService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.qrCodeGeneratorService = qrCodeGeneratorService;
    }

    public ResponseEntity<?> updatePassword(UpdatePasswordRequestDto updatePasswordRequest, String username) throws AppException, IOException, TemplateException {

        if (!StringUtils.hasText(username)) {
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


    public ResponseEntity<?> check2FAUsage(String username) throws AppException {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException("Unable to retrieve this user !"));

        return new ResponseEntity<>(new TwoFAStatusResponseDto(user.isUsingTwoFA()), HttpStatus.OK);
    }


    //TODO RESCUE PASSWORDS
    public ResponseEntity<?> enable2FAAuthentication(String username, int step, EnableTwoFARequestDto enableTwoFARequestDto) throws AppException, WriterException, IOException {

        if (step == 0 || step == 1) {

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new AppException("Unable to retrieve this user !"));

            user.setUsingTwoFA(true);

            GoogleAuthenticator gAuth = new GoogleAuthenticator();
            final GoogleAuthenticatorKey key = gAuth.createCredentials();

            user.setTwoFASecret(key.getKey());

            userRepository.save(user);

            byte[] qrCodeByteData = qrCodeGeneratorService.generate2FAQRCode(user.getUsername(), user.getTwoFASecret());

            return new ResponseEntity<>(new EnableTwoFAStepOneResponseDto(true, qrCodeByteData), HttpStatus.OK);

        } else if (step == 2) {

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new AppException("Unable to retrieve this user !"));

            if (StringUtils.hasText(enableTwoFARequestDto.getPassword())
                    && enableTwoFARequestDto.getTwoFACode() > 0) {

                if (Integer.toString(enableTwoFARequestDto.getTwoFACode()).length() == 5
                        || Integer.toString(enableTwoFARequestDto.getTwoFACode()).length() == 6) {

                    if (passwordEncoder.matches(enableTwoFARequestDto.getPassword(), user.getPassword())) {

                        GoogleAuthenticator gAuth = new GoogleAuthenticator();
                        String twoFAUserKey = user.getTwoFASecret();

                        if (gAuth.authorize(twoFAUserKey, enableTwoFARequestDto.getTwoFACode())) {
                            return new ResponseEntity<>(new ApiResponseDto(true, "2FA is now enabled for your account !"), HttpStatus.OK);
                        } else {
                            user.setUsingTwoFA(false);
                            user.setTwoFASecret("");

                            userRepository.save(user);

                            throw new AppException("Invalid verification code !");
                        }

                    } else {
                        throw new AppException("Your password does not match ! Please try again.");
                    }
                } else {
                    throw new AppException("Invalid 2FA code. Please try again later and send a valid code.");
                }
            } else {
                throw new AppException("Bad Request. Please confirm your password and give a 2FA valid code !");
            }

        } else {
            throw new AppException("Undefined step ! Your request is invalid please try again later...");
        }
    }


    //TODO PASSWORD CONFIRMATION
    public ResponseEntity<?> disable2FAAuthentication(String username) throws AppException {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException("Unable to retrieve this user !"));

        user.setUsingTwoFA(false);
        user.setTwoFASecret("");

        userRepository.save(user);

        return new ResponseEntity<>(new ApiResponseDto(true, "Two Factor Authentication is now disabled !"), HttpStatus.OK);
    }
}
