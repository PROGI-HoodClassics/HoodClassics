package hoodclassics.opp.dao;

import hoodclassics.opp.domain.HoodClassicsUser;
import hoodclassics.opp.domain.LocalUser;
import hoodclassics.opp.domain.compositeKeys.LocalUserId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalUserRepository extends JpaRepository<LocalUser, LocalUserId> {
    boolean existsByTownIdAndUserId(Long townId, Long userId);
}
