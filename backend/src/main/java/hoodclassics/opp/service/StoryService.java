package hoodclassics.opp.service;

import hoodclassics.opp.domain.Report;
import hoodclassics.opp.domain.Story;
import hoodclassics.opp.domain.StoryPin;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface StoryService {
    ResponseEntity<Map<String,Object>> getStory(Long id);
    ResponseEntity<List<StoryPin>> getStories(Double longitude, Double latitude, Double radius);
    ResponseEntity<Map<String, Object>> createStory(String text, String title, Double latitude, Double longitude);
    ResponseEntity<Map<String, Object>> likeStory(Long id);
    ResponseEntity<String> addTagToStory(Long storyId, Long tagId);
    ResponseEntity<Map<String, Object>> submitReport(Long storyID, String reportCategory, String description);
    ResponseEntity<Object> getStoriesByTags(Double longitude, Double latitude, Double radius, List<Long> tagIds);
    List<Report> getReports();
    Story getStoryObj(Long id);
    ResponseEntity <String> deleteStory(Long id);
}