package hoodclassics.opp.dao;

import hoodclassics.opp.domain.LocalUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalUserRepository extends JpaRepository<LocalUser, LocalUserId> {
    boolean existsByTownIdAndUserId(Long townId, Long userId);
}
