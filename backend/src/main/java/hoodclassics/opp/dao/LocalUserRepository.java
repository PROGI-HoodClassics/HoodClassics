package hoodclassics.opp.dao;

import hoodclassics.opp.domain.LocalUser;
import hoodclassics.opp.domain.UserIdTownIdKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalUserRepository extends JpaRepository<LocalUser, UserIdTownIdKey> {
    boolean existsByUserIdTownIdKey_TownIdAndUserIdTownIdKey_UserId(Long townId, Long userId);
}
