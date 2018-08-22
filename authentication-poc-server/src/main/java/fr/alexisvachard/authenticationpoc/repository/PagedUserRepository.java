package fr.alexisvachard.authenticationpoc.repository;

import fr.alexisvachard.authenticationpoc.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PagedUserRepository extends PagingAndSortingRepository<User, Long> {

    Page<User> findAll(Pageable pageable);
}
