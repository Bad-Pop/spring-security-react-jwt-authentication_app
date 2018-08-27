package fr.alexisvachard.authenticationpoc.web.admin;

import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.service.admin.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(maxAge = 36000)
@RestController
@RequestMapping(path = "/api/secure/admin/dashboard/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @Secured("ROLE_ADMIN")
    @GetMapping
    public ResponseEntity<?> getStatistics() throws AppException {
        return statisticsService.getStatistics();
    }
}
