package hoodclassics.opp.dao;

import hoodclassics.opp.domain.HasSeen;
import hoodclassics.opp.domain.UserIdStoryIdKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HasSeenRepository extends JpaRepository<HasSeen, UserIdStoryIdKey> {

}
