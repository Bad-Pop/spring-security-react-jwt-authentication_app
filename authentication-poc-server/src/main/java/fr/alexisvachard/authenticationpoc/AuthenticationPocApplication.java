package fr.alexisvachard.authenticationpoc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication(scanBasePackages = "fr.alexisvachard.authenticationpoc")
@EntityScan(basePackageClasses = {
        AuthenticationPocApplication.class,
        Jsr310JpaConverters.class
})
@EnableJpaRepositories(basePackages = "fr.alexisvachard.authenticationpoc.persistence.repository")
public class AuthenticationPocApplication {

    @PostConstruct
    void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC+2"));
    }

    public static void main(String[] args) {
        SpringApplication.run(AuthenticationPocApplication.class, args);
    }
}
