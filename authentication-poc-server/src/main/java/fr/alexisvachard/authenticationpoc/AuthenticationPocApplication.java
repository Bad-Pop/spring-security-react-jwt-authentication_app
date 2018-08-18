package fr.alexisvachard.authenticationpoc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EntityScan(basePackageClasses = {
        AuthenticationPocApplication.class,
        Jsr310JpaConverters.class
})
@ComponentScan("fr.alexisvachard.authenticationpoc")
@EnableJpaRepositories(basePackages = "fr.alexisvachard.authenticationpoc.repository")
public class AuthenticationPocApplication {

    @PostConstruct
    void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC+2"));
    }

    public static void main(String[] args) {
        SpringApplication.run(AuthenticationPocApplication.class, args);
    }
}
