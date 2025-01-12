package hoodclassics.opp.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import hoodclassics.opp.dao.CoordinatesRepository;
import hoodclassics.opp.dao.StoryRepository;
import hoodclassics.opp.domain.Coordinates;
import hoodclassics.opp.domain.Story;
import hoodclassics.opp.domain.StoryPin;
import hoodclassics.opp.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class StoryServiceImpl implements StoryService {
	
	// In km
	private static final Double earthRadius = 6378.14;

    @Autowired
    private StoryRepository storyRepo;
    @Autowired
    private CoordinatesRepository coordsRepo;

    @Override
    public Story getStory(Long id) {
        return storyRepo.findByStoryId(id);
    }

	@Override
	public ResponseEntity<List<StoryPin>> getStories(Double longitude, Double latitude, Double radius) {
		List<Coordinates> coords = coordsRepo.findAll();
		List<StoryPin> pins = coords.stream().map(x -> {return new StoryPin(x);}).toList();
		pins = pins.stream().filter(x -> {
			return getDistanceBetweenCoordinates(longitude, x.getLongitude(), latitude, x.getLatitude()) < radius;
					}).toList();
		return new ResponseEntity<List<StoryPin>>(pins, HttpStatus.OK);
	}
	
	private Double getDistanceBetweenCoordinates(Double lon1, Double lon2, Double lat1, Double lat2) {
		lon1 = lon1 * Math.PI / 180.0;
		lon2 = lon2 * Math.PI / 180.0;
		lat1 = lat1 * Math.PI / 180.0;
		lat2 = lat2 * Math.PI / 180.0;
		
		Double dLat = lat2 - lat1;
		Double dLon = lon2 - lon1;
		
		Double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
		return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * earthRadius;
	}
    
    
}
