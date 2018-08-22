package fr.alexisvachard.authenticationpoc.web.admin;

import fr.alexisvachard.authenticationpoc.service.admin.DashboardUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/secure/admin/dashboard/users")
public class DashboardUsersController {

    @Autowired
    private DashboardUsersService dashboardUsersService;

    @Secured("ROLE_ADMIN")
    @GetMapping
    public ResponseEntity<?> getUsers(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        return dashboardUsersService.getUsers(page, size);
    }
}
