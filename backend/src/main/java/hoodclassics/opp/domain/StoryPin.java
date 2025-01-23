package hoodclassics.opp.domain;

// TODO: Fix the fact that likes are hardcoded to 0
public class StoryPin {

	private Double longitude;
	private Double latitude;
	private Long storyId;
	private Long likes;
	
	public StoryPin() {
		super();
		this.longitude = null;
		this.latitude = null;
		this.storyId = null;
		this.likes = null;
	}

	public StoryPin(Double longitude, Double latitude, Long storyId, Long likes) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.storyId = storyId;
		this.likes = likes;
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

	public Long getLikes() {
		return likes;
	}

	public void setLikes(Long likes) {
		this.likes = likes;
	}
	
}
