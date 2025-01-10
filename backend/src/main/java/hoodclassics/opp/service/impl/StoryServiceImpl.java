package hoodclassics.opp.service.impl;

import java.util.Optional;

import hoodclassics.opp.dao.StoryRepository;
import hoodclassics.opp.domain.Story;
import hoodclassics.opp.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoryServiceImpl implements StoryService {

    @Autowired
    private StoryRepository storyRepo;

    @Override
    public Story getStory(Long id) {
        return storyRepo.findByStoryId(id);
    }
}
