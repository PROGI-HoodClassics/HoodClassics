package hoodclassics.opp.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hoodclassics.opp.domain.IsTagged;
import hoodclassics.opp.domain.StoryIdTagIdKey;

public interface IsTaggedRepository extends JpaRepository<IsTagged, StoryIdTagIdKey> {
	
}
