package hoodclassics.opp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import hoodclassics.opp.domain.HoodClassicsUser;

import java.util.Optional;

public interface UserRepository extends JpaRepository<HoodClassicsUser, Long> {

    Optional<HoodClassicsUser> findByUsername(String username);
    Optional<HoodClassicsUser> findByUsernameAndPassword(String username, String password);
    Optional<HoodClassicsUser> findByEmail(String email);
}
