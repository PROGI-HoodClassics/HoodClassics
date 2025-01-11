package hoodclassics.opp.service.impl;

import hoodclassics.opp.dao.StoryRepository;
import hoodclassics.opp.dao.UserRepository;
import hoodclassics.opp.domain.HoodClassicsUser;
import hoodclassics.opp.domain.Story;
import hoodclassics.opp.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import hoodclassics.opp.dao.LocalUserRepository;
import hoodclassics.opp.dao.TownRepository;
import hoodclassics.opp.domain.Town;
import hoodclassics.opp.service.GeocodingService;
import org.springframework.http.HttpStatus;
import java.sql.Timestamp;
import java.time.Instant;

/*
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
*/
@Service
public class StoryServiceImpl implements StoryService {
    //private static final Logger logger = LoggerFactory.getLogger(StoryService.class);

    @Autowired
    private StoryRepository storyRepo;
    @Autowired
    private GeocodingService geocodingService;
    @Autowired
    private TownRepository townRepository;
    @Autowired
    private LocalUserRepository localUserRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Story getStory(Long id) {
        return storyRepo.findByStoryId(id);
    }


    @Override
    public ResponseEntity<String> createStory(
                                      String text,
                                      String title,
                                      Double latitude,
                                      Double longitude) {
        String adress = this.geocodingService.reverseGeocode(latitude, longitude);
        String townName = this.geocodingService.extractTownFromAddress(adress);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        /*
        logger.debug(text);
        logger.debug(adress);
        logger.debug(townName);
        logger.debug(username);
        */
        Town town = townRepository.findByTownName(townName);
        if (town == null) {
            return new ResponseEntity<String>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        Long town_id = town.getTownId();
        HoodClassicsUser user = userRepository.findByUsername(username).get(); // napravi check isPresent
        Long user_id = user.getUserId();

        if (!localUserRepository.existsByTownIdAndUserId(town_id, user_id)) {
            return new ResponseEntity<String>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        Story newStory = new Story(text, title, Timestamp.from(Instant.now()), user_id, town_id);
        storyRepo.save(newStory);
        return ResponseEntity.ok("");
    }
}
