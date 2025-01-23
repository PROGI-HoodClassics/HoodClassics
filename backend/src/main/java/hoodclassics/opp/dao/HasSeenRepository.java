package hoodclassics.opp.dao;

import hoodclassics.opp.domain.HasSeen;
import hoodclassics.opp.domain.UserIdStoryIdKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HasSeenRepository extends JpaRepository<HasSeen, UserIdStoryIdKey> {
    @Query("SELECT COUNT(h) FROM HasSeen h WHERE h.userIdStoryIdKey.storyId = :storyId AND h.liked = true")
    Long countLikesByStoryId(@Param("storyId") Long storyId);
    HasSeen findByUserIdStoryIdKey(UserIdStoryIdKey userIdStoryIdKey);
}
