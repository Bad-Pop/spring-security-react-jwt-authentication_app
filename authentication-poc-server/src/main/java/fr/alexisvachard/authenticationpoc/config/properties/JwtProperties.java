package fr.alexisvachard.authenticationpoc.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("fr.alexisvachard.authentication-poc.jwt")
public class JwtProperties {

    private String secret;
    private int expirationInMs;
    private Long rememberMeExpirationInMs;

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public int getExpirationInMs() {
        return expirationInMs;
    }

    public void setExpirationInMs(int expirationInMs) {
        this.expirationInMs = expirationInMs;
    }

    public Long getRememberMeExpirationInMs() {
        return rememberMeExpirationInMs;
    }

    public void setRememberMeExpirationInMs(Long rememberMeExpirationInMs) {
        this.rememberMeExpirationInMs = rememberMeExpirationInMs;
    }
}
