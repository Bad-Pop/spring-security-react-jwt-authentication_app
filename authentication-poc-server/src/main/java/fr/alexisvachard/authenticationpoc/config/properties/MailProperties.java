package fr.alexisvachard.authenticationpoc.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("fr.alexisvachard.authentication-poc.email")
@Component
public class MailProperties {

    private String from;

    private String templateBasePackage;

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTemplateBasePackage() {
        return templateBasePackage;
    }

    public void setTemplateBasePackage(String templateBasePackage) {
        this.templateBasePackage = templateBasePackage;
    }
}
