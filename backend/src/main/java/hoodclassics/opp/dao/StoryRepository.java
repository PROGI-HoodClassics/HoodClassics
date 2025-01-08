package hoodclassics.opp.dao;

import hoodclassics.opp.domain.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, Long> {

    Optional<Story> findById(Long id);
}
