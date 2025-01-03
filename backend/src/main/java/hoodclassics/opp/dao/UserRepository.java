package hoodclassics.opp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import hoodclassics.opp.domain.RepositoryUser;

import java.util.Optional;

public interface UserRepository extends JpaRepository<RepositoryUser, Long> {

    Optional<RepositoryUser> findByUsername(String username);
    Optional<RepositoryUser> findByUsernameAndPassword(String username, String password);
}
