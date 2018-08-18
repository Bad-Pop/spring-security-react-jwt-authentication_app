package fr.alexisvachard.authenticationpoc.service.mail;

import fr.alexisvachard.authenticationpoc.config.properties.MailProperties;
import fr.alexisvachard.authenticationpoc.model.User;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class MailService {

    private MailProperties mailProperties;
    private JavaMailSender javaMailSender;
    private Configuration freemarkerConfiguration;

    @Autowired
    public MailService(MailProperties mailProperties, JavaMailSender javaMailSender, Configuration freemarkerConfiguration) {
        this.mailProperties = mailProperties;
        this.javaMailSender = javaMailSender;
        this.freemarkerConfiguration = freemarkerConfiguration;

        freemarkerConfiguration.setClassForTemplateLoading(this.getClass(), mailProperties.getTemplateBasePackage());
    }


    @Async("threadPoolTaskExecutor")
    public void sendPasswordUpdatedNotification(User user) throws IOException, TemplateException {

        Map<String, String> model = new HashMap<>();
        model.put("username", user.getUsername());

        Date now = new Date();
        SimpleDateFormat formater = new SimpleDateFormat("'le' dd/MM/yyyy");

        model.put("date", formater.format(now));

        String mailBody = FreeMarkerTemplateUtils.processTemplateIntoString(freemarkerConfiguration.getTemplate("passwordUpdatedNotification.ftl"), model);

        MimeMessagePreparator preparator = mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            message.setSubject("Modification de votre mot de passe");
            message.setTo(user.getEmail());
            message.setFrom(mailProperties.getFrom());
            message.setText(mailBody, true);
        };

        javaMailSender.send(preparator);
    }
}
