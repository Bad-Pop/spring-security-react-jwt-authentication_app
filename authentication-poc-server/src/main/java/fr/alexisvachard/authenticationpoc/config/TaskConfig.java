package fr.alexisvachard.authenticationpoc.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
@ComponentScan("fr.alexisvachard.authenticationpoc.task")
public class TaskConfig {
}
