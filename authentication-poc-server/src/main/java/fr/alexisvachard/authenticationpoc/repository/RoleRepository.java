package fr.alexisvachard.authenticationpoc.repository;

import fr.alexisvachard.authenticationpoc.model.Role;
import fr.alexisvachard.authenticationpoc.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(RoleName roleName);
}
