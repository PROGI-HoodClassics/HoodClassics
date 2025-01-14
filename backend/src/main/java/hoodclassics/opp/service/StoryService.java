package hoodclassics.opp.service;

import hoodclassics.opp.domain.Story;
import hoodclassics.opp.domain.StoryPin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

public interface StoryService {
    ResponseEntity<Map<String,Object>> getStory(Long id);
    ResponseEntity<List<StoryPin>> getStories(Double longitude, Double latitude, Double radius);
    ResponseEntity<Map<String, Object>> createStory(
                               String text,
                               String title,
                               Double latitude,
                               Double longitude);

}
