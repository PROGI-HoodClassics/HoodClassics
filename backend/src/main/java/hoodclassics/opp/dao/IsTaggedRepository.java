package hoodclassics.opp.dao;

import java.util.Optional;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import hoodclassics.opp.domain.IsTagged;
import hoodclassics.opp.domain.StoryIdTagIdKey;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IsTaggedRepository extends JpaRepository<IsTagged, StoryIdTagIdKey> {
}
