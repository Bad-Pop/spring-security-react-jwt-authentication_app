package fr.alexisvachard.authenticationpoc.task;

import fr.alexisvachard.authenticationpoc.persistence.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;

@Service
@Transactional
public class PurgePasswordResetTokenTask {

    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    public PurgePasswordResetTokenTask(PasswordResetTokenRepository passwordResetTokenRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Scheduled(cron = "0 0 5 * * ?")
    public void purgeExpiredPasswordResetToken() {

        Date now = Date.from(Instant.now());

        passwordResetTokenRepository.deleteAllExpiredSince(now);
    }
}
