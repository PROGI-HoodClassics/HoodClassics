package hoodclassics.opp.dao;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import hoodclassics.opp.domain.Coordinates;
import hoodclassics.opp.domain.LongitudeLatitudeKey;
import org.springframework.data.repository.query.Param;

public interface CoordinatesRepository extends JpaRepository<Coordinates, LongitudeLatitudeKey> {
	
	List<Coordinates> findAll();
	Coordinates findByStoryId(Long storyId);
	@Modifying
	@Transactional
	@Query("DELETE FROM Coordinates c WHERE c.storyId = :storyId")
	void deleteByStoryId(@Param("storyId") Long storyId);
}
