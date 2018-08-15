package fr.alexisvachard.authenticationpoc.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("fr.alexisvachard.authentication-poc.cors")
@Component
public class CorsProperties {

    private int maxAge;

    public int getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(int maxAge) {
        this.maxAge = maxAge;
    }
}
