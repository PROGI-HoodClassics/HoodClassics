package hoodclassics.opp.domain;

import jakarta.persistence.*;

@Entity
@Table(name="coordinates")
public class Coordinates {

	@Id
	@Column(name="longitude")
	private Double longitude;
	
	@Id
	@Column(name="latitude")
	private Double latitude;
	
	@ManyToOne
	@JoinColumn(name="town_id")
	private Town town;
	
	@ManyToOne
	@JoinColumn(name="story_id")
	private Story story;
	
	public Coordinates() {
		this.latitude = null;
		this.longitude = null;
		this.town = null;
		this.story = null;
	}

	public Coordinates(Double longitude, Double latitude, Long townId, Long storyId) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.town = town;
		this.story = story;
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
	public Long getTownId() {
		return town.getTownId();
	}
	public Long getStoryId() {
		return story.getStoryId();
	}
	@Override
	public String toString() {
		return "Coordinates [longitude=" + longitude + ", latitude=" + latitude + ", townId=" + town.getTownId() +
				", storyId=" + story.getStoryId() + "]";
	}
	
}
