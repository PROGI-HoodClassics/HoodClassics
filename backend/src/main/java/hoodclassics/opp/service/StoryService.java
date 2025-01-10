package hoodclassics.opp.service;

import hoodclassics.opp.domain.Story;

import java.util.Optional;

public interface StoryService {
    Story getStory(Long id);
}
