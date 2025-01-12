package hoodclassics.opp.rest;

import hoodclassics.opp.domain.Story;
import hoodclassics.opp.domain.StoryPin;
import hoodclassics.opp.service.StoryService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/story")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @GetMapping("/{story_id}")
    @ResponseBody()
    public Story getStory(@PathVariable String story_id) {
        return storyService.getStory(Long.parseLong(story_id));
    }

    @GetMapping(value="/stories")
    public ResponseEntity<List<StoryPin>> getStories(@RequestParam Double longitude,
    			@RequestParam Double latitude, @RequestParam Double radius) {
    	return storyService.getStories(longitude, latitude, radius);
    }
}
