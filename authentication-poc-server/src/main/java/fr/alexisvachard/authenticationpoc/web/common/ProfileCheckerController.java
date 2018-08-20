package fr.alexisvachard.authenticationpoc.web.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/public/profile-checker")
@CrossOrigin(maxAge = 3600)
public class ProfileCheckerController {

    @Autowired
    private Environment env;

    @Secured("ROLE_ADMIN")
    @GetMapping
    public String checkProfile() {
        return "Spring boot is running under " + env.getActiveProfiles()[0].toUpperCase() + " profile !";
    }
}
