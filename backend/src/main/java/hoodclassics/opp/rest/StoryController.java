package hoodclassics.opp.rest;

import hoodclassics.opp.domain.Story;
import hoodclassics.opp.service.StoryService;
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
    public Story getStory(@PathVariable String story_id) {
        return storyService.getStory(Long.parseLong(story_id));
    }

    @PostMapping
    @ResponseBody()
    public ResponseEntity<String> postStory(@RequestParam String text,
                                            @RequestParam String title,
                                            @RequestParam Double latitude,
                                            @RequestParam Double longitude) {
        return storyService.createStory(text, title, latitude, longitude);
    }

}
