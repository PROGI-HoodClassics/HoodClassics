package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="coordinates")
public class Coordinates {

	@Id
	@Column(name="longitude")
	private Double longitude;
	
	@Id
	@Column(name="latitude")
	private Double latitude;
	
	@OneToMany
	@JoinColumn(name="town_id")
	private Long townId;
	
	@OneToMany
	@JoinColumn(name="story_id")
	private Long storyId;
	
	public Coordinates() {
		this.latitude = null;
		this.longitude = null;
		this.townId = null;
		this.storyId = null;
	}

	public Coordinates(Double longitude, Double latitude, Long townId, Long storyId) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.townId = townId;
		this.storyId = storyId;
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
		return townId;
	}
	public void setTownId(Long townId) {
		this.townId = townId;
	}
	public Long getStoryId() {
		return storyId;
	}
	public void setStoryId(Long storyId) {
		this.storyId = storyId;
	}
	@Override
	public String toString() {
		return "Coordinates [longitude=" + longitude + ", latitude=" + latitude + ", townId=" + townId + ", storyId="
				+ storyId + "]";
	}
	
}
