package hoodclassics.opp.rest;

import hoodclassics.opp.domain.Story;
import hoodclassics.opp.domain.StoryPin;
import hoodclassics.opp.service.StoryService;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/story")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @GetMapping("/{story_id}")
    @ResponseBody()
    public ResponseEntity<Map<String,Object>> getStory(@PathVariable String story_id) {
        return storyService.getStory(Long.parseLong(story_id));
    }

    @GetMapping(value="/stories")
    public ResponseEntity<List<StoryPin>> getStories(@RequestParam Double longitude,
    			@RequestParam Double latitude, @RequestParam Double radius) {
    	return storyService.getStories(longitude, latitude, radius);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> postStory(@RequestBody CreateStoryBody body) {
        return storyService.createStory(body.text, body.title, body.latitude, body.longitude);
    }


    public static class CreateStoryBody{
        public String text;
        public String title;
        public Double latitude;
        public Double longitude;
    }

}
