package fr.alexisvachard.authenticationpoc.task;

import fr.alexisvachard.authenticationpoc.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.time.Instant;

@Service
@Transactional
public class PasswordResetTokenPurgeTask {

    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    public PasswordResetTokenPurgeTask(PasswordResetTokenRepository passwordResetTokenRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Scheduled(cron = "${fr.alexisvachard.authentication-poc.purge.cron.expression}")
    public void purgeExpiredPasswordResetToken() {

        Date now = Date.from(Instant.now());

        passwordResetTokenRepository.deleteAllExpiredSince(now);
    }
}
