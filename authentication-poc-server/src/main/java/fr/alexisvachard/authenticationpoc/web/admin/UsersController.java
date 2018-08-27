package fr.alexisvachard.authenticationpoc.web.admin;

import fr.alexisvachard.authenticationpoc.service.admin.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping(path = "/api/secure/admin/dashboard/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @Secured("ROLE_ADMIN")
    @GetMapping
    public ResponseEntity<?> getUsers(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "6") int size
    ) {
        return usersService.getUsers(page, size);
    }
}
