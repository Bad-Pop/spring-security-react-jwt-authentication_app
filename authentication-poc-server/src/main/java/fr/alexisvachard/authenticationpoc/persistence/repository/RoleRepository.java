package fr.alexisvachard.authenticationpoc.persistence.repository;

import fr.alexisvachard.authenticationpoc.persistence.model.Role;
import fr.alexisvachard.authenticationpoc.persistence.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(RoleName roleName);
}
