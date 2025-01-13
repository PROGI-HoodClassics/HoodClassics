package hoodclassics.opp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import hoodclassics.opp.domain.Coordinates;
import hoodclassics.opp.domain.LongitudeLatitudeKey;

public interface CoordinatesRepository extends JpaRepository<Coordinates, LongitudeLatitudeKey> {
	
	List<Coordinates> findAll();
	
}
