package hoodclassics.opp.rest;

import hoodclassics.opp.domain.Story;
import hoodclassics.opp.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/story")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @GetMapping("/{story_id}")
    @ResponseBody()
    public Story getStory(@PathVariable String story_id) {
        return storyService.getStory(Long.parseLong(story_id));
    }

}
