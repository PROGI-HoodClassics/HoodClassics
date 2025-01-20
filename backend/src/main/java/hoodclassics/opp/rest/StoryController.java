package hoodclassics.opp.rest;

import hoodclassics.opp.domain.Report;
import hoodclassics.opp.domain.Story;
import hoodclassics.opp.domain.StoryPin;
import hoodclassics.opp.service.StoryService;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import hoodclassics.opp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/story")
public class StoryController {

    @Autowired
    private StoryService storyService;
    @Autowired
    private UserService userService;

    @GetMapping(value="/stories")
    public ResponseEntity<List<StoryPin>> getStories(@RequestParam Double longitude, @RequestParam Double latitude,
                                                     @RequestParam Double radius) {
    	return storyService.getStories(longitude, latitude, radius);
    }
    
    @PostMapping("/addtag")
    public ResponseEntity<String> addTagToStory(@RequestBody AddTagToStoryBody body) {
    	return storyService.addTagToStory(body.story_id, body.tag_id);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> postStory(@RequestBody CreateStoryBody body) {
        return storyService.createStory(body.text, body.title, body.latitude, body.longitude);
    }

    @PostMapping("/like/{story_id}")
    public ResponseEntity<Map<String, Object>> likeStory(@PathVariable String story_id) {
        return storyService.likeStory(Long.parseLong(story_id));
    }

    @GetMapping("/reports")
    public ResponseEntity<?> getReports() {
        boolean isModerator = userService.isModerator();
        if (!isModerator) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not a moderator");
        }
        List<Report> reports = storyService.getReports();
        return ResponseEntity.status(HttpStatus.OK).body(reports);
    }

    public static class CreateStoryBody{
        public String text;
        public String title;
        public Double latitude;
        public Double longitude;
    }
    
    public static class AddTagToStoryBody {
    	public Long story_id;
    	public Long tag_id;
    }

    @GetMapping("/{story_id}")
    @ResponseBody()
    public ResponseEntity<Map<String,Object>> getStory(@PathVariable String story_id) {
        return storyService.getStory(Long.parseLong(story_id));
    }

    @PostMapping("/report")
    public ResponseEntity<Map<String, Object>> submitReport(@RequestParam Long storyID,
                                                            @RequestParam String reportCategory,
                                                            @RequestParam String description) {
        return storyService.submitReport(storyID, reportCategory, description);
    }

    @PostMapping("/delete/{story_id}")
    public ResponseEntity<String> deleteStory(@PathVariable String story_id) {
        Long id = Long.parseLong(story_id);
        boolean isModerator = userService.isModerator();
        Long userId = userService.trueUserId();
        if (storyService.getStoryObj(id) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Story doesn't exist");
        }
        Long authId = storyService.getStoryObj(id).getUserId();
        if (!isModerator && !userId.equals(authId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not a moderator or the author");
        }
        return storyService.deleteStory(id);
    }
}
