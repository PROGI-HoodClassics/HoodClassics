package hoodclassics.opp.service.impl;

import java.util.*;

import hoodclassics.opp.dao.*;
import hoodclassics.opp.domain.*;
import hoodclassics.opp.dao.StoryRepository;
import hoodclassics.opp.service.StoryService;
import hoodclassics.opp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import hoodclassics.opp.service.GeocodingService;

import java.sql.Timestamp;
import java.time.Instant;

@Service
public class StoryServiceImpl implements StoryService {
	
	// In km
	private static final Double earthRadius = 6378.14;
    // private static final Logger logger = LoggerFactory.getLogger(StoryService.class);
    @Autowired
    private GeocodingService geocodingService;
    @Autowired
    private UserService userService;

    @Autowired
    private StoryRepository storyRepo;
    @Autowired
    private CoordinatesRepository coordsRepo;
    @Autowired
    private TownRepository townRepository;
    @Autowired
    private LocalUserRepository localUserRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HasSeenRepository hasSeenRepo;
    @Autowired
    private IsTaggedRepository isTaggedRepo;
    @Autowired
    private TagRepository tagRepo;
    @Autowired
    private ReportRepository reportRepo;

    @Override
    public ResponseEntity<Map<String,Object>> getStory(Long id) {
        Story story =  storyRepo.findByStoryId(id);
        String text = story.getText();
        String title = story.getTitle();
        Long likes = hasSeenRepo.countLikesByStoryId(id);
        Long user_id = story.getUserId();
        Coordinates coords = coordsRepo.findByStoryId(id);
        Double latitude = coords.getLatitude();
        Double longitude = coords.getLongitude();

        Map<String, Object> response = new HashMap<String, Object>();
        response.put("story_id", id.toString());
        response.put("text", text);
        response.put("title", title);
        response.put("latitude", latitude);
        response.put("longitude", longitude);
        response.put("likes", likes);
        response.put("dislikes", 0);
        response.put("user_id", user_id);
        return ResponseEntity.ok(response);
    }

	@Override
	public ResponseEntity<List<StoryPin>> getStories(Double longitude, Double latitude, Double radius) {
		List<Coordinates> coords = coordsRepo.findAll();
		List<StoryPin> pins = coords.stream().map(x -> {return new StoryPin(x);}).toList();
		pins = pins.stream().filter(x -> {
			return getDistanceBetweenCoordinates(longitude, x.getLongitude(), latitude, x.getLatitude()) < radius;
					}).toList();
		return new ResponseEntity<List<StoryPin>>(pins, HttpStatus.OK);
	}
	
	private Double getDistanceBetweenCoordinates(Double lon1, Double lon2, Double lat1, Double lat2) {
		lon1 = lon1 * Math.PI / 180.0;
		lon2 = lon2 * Math.PI / 180.0;
		lat1 = lat1 * Math.PI / 180.0;
		lat2 = lat2 * Math.PI / 180.0;
		
		Double dLat = lat2 - lat1;
		Double dLon = lon2 - lon1;
		
		Double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
		return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * earthRadius;
	}

    @Override
    public ResponseEntity<Map<String,Object>> createStory(String text, String title, Double latitude, Double longitude) {
        Optional<String> maybeAddress = this.geocodingService.reverseGeocode(latitude, longitude);
        if (maybeAddress.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "invalid coordinates");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        Optional<String> maybeTownName = this.geocodingService.extractLocationFromAddress(maybeAddress.get());
        Optional<String> maybeCountry = this.geocodingService.extractCountryFromAddress(maybeAddress.get());
        if (maybeTownName.isEmpty() || maybeCountry.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "invalid coordinates, address exists but town or country doesn't...probably should call Hrvoje");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);

        }
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Town town = townRepository.findByTownName(maybeTownName.get());
        if (town == null) {
            Map<String, Object> response = new HashMap<String, Object>();
            response.put("error", "This town doesn't exist in database, probably there aren't any users associated with this town");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        Long town_id = town.getTownId();
        HoodClassicsUser user = userRepository.findByUsername(username).get();
        Long user_id = user.getUserId();

        if (!localUserRepository.existsByUserIdTownIdKey_TownIdAndUserIdTownIdKey_UserId(town_id, user_id)) {
            Map<String, Object> response = new HashMap<String, Object>();
            response.put("error", "You are not a local here!");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        Story newStory = new Story(text, title, Timestamp.from(Instant.now()), user_id, town_id);
        Long storyId = storyRepo.save(newStory).getStoryId();
        coordsRepo.save(new Coordinates(longitude, latitude, town_id, storyId));

        HasSeen hasSeen = new HasSeen(user_id, storyId, false);
        hasSeenRepo.save(hasSeen);

        Map<String, Object> response = new HashMap<String, Object>();
        response.put("story_id", storyId.toString());
        response.put("text", text);
        response.put("title", title);
        response.put("latitude", latitude);
        response.put("longitude", longitude);
        response.put("likes", 0);
        response.put("dislikes", 0);
        response.put("user_id", user_id);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Object>> likeStory(Long story_id) {
        Map<String, Object> response = new HashMap<String, Object>();
        Long likes;

        if (!storyRepo.existsById(story_id)) {
            response.put("error", "That story doesn't exist");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long user_id = userService.trueUserId();
        UserIdStoryIdKey key = new UserIdStoryIdKey(user_id, story_id);
        boolean exists = hasSeenRepo.existsById(key);
        if (exists) {
            HasSeen h = hasSeenRepo.findByUserIdStoryIdKey(key);
            boolean liked = h.getLiked();
            if (liked) {
                h.setLiked(false);
                hasSeenRepo.save(h);
                likes = hasSeenRepo.countLikesByStoryId(story_id);
                response.put("likes", likes);
                response.put("hasLiked", false);
                return ResponseEntity.ok(response);
            }
        }

        HasSeen hasSeen = new HasSeen(user_id, story_id, true);
        hasSeenRepo.save(hasSeen);
        likes = hasSeenRepo.countLikesByStoryId(story_id);
        response.put("likes", likes);
        response.put("hasLiked", true);
        return ResponseEntity.ok(response);
    }

	@Override
	public ResponseEntity<String> addTagToStory(Long storyId, Long tagId) {
		Boolean isAlreadyTagged =  isTaggedRepo.findById(new StoryIdTagIdKey(storyId, tagId)).isPresent();
		if (isAlreadyTagged) {
			return new ResponseEntity<String>("That story already has that tag", HttpStatus.FORBIDDEN);
		} else if (tagRepo.findById(tagId).isEmpty()) {
			return new ResponseEntity<String>(tagId + " does not correspond to a tag", HttpStatus.BAD_REQUEST);
		} else if (storyRepo.findById(storyId).isEmpty()) {
			return new ResponseEntity<String>(storyId + " does not correspond to a story", HttpStatus.BAD_REQUEST);
		} else {
			isTaggedRepo.save(new IsTagged(storyId, tagId));
			return new ResponseEntity<String>("OK", HttpStatus.OK);
		}
	}

    @Override
    public List<Report> getReports() {
        return reportRepo.findAll();
    }

}
