package hoodclassics.opp.service;

import hoodclassics.opp.domain.Story;

import java.util.Optional;

public interface StoryService {
    Optional<Story> getStory(Long id);
}
