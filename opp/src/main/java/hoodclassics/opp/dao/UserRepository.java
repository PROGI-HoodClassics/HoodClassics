package hoodclassics.opp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import hoodclassics.opp.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
