package hoodclassics.opp.service;

import hoodclassics.opp.domain.Story;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

public interface StoryService {
    Story getStory(Long id);
    ResponseEntity<String> createStory(
                               String text,
                               String title,
                               Double latitude,
                               Double longitude);
}
