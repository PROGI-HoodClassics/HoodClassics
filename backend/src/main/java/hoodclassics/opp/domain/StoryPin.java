package hoodclassics.opp.domain;

// TODO: Fix the fact that likes are hardcoded to 0
public class StoryPin {

	private Double longitude;
	private Double latitude;
	private Long storyId;
	private Integer likes;
	
	public StoryPin() {
		super();
		this.longitude = null;
		this.latitude = null;
		this.storyId = null;
		this.likes = 0;
	}

	public StoryPin(Double longitude, Double latitude, Long storyId, Integer likes) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.storyId = storyId;
		this.likes = 0;
	}
	
	public StoryPin(Coordinates coordinates) {
		this.longitude = coordinates.getLongitude();
		this.latitude = coordinates.getLatitude();
		this.storyId = coordinates.getStoryId();
		this.likes = 0;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Long getStoryId() {
		return storyId;
	}

	public void setStoryId(Long storyId) {
		this.storyId = storyId;
	}

	public Integer getLikes() {
		return likes;
	}

	public void setLikes(Integer likes) {
		this.likes = likes;
	}
	
}
