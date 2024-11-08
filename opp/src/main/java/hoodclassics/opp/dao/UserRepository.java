package hoodclassics.opp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import hoodclassics.opp.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
