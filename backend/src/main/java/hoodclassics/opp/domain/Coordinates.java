package hoodclassics.opp.domain;

import jakarta.persistence.*;

@Entity
@Table(name="coordinates")
public class Coordinates {

	@EmbeddedId
	// TODO: Setirati ga na non-null u konstruktorima. Takoder u ostatku baze.
	private LongitudeLatitudeKey longitudeLatitudeKey = new LongitudeLatitudeKey();
	
	@Column(name="town_id")
	private Long townId;
	
	@Column(name="story_id")
	private Long storyId;
	
	public Coordinates() {
		this.longitudeLatitudeKey.setLongitude(null);
		this.longitudeLatitudeKey.setLatitude(null);
		this.townId = null;
		this.storyId = null;
	}

	public Coordinates(Double longitude, Double latitude, Long townId, Long storyId) {
		super();
		this.longitudeLatitudeKey.setLongitude(longitude);
		this.longitudeLatitudeKey.setLatitude(latitude);
		this.townId = townId;
		this.storyId = storyId;
	}

	public Double getLongitude() {
		return this.longitudeLatitudeKey.getLongitude();
	}
	public void setLongitude(Double longitude) {
		this.longitudeLatitudeKey.setLongitude(longitude);
	}
	public Double getLatitude() {
		return this.longitudeLatitudeKey.getLatitude();
	}
	public void setLatitude(Double latitude) {
		this.longitudeLatitudeKey.setLatitude(latitude);
	}
	public Long getTownId() {
		return townId;
	}
	public Long getStoryId() {
		return storyId;
	}
	@Override
	public String toString() {
		return "Coordinates [longitude=" + this.longitudeLatitudeKey.getLongitude() + 
				", latitude=" + this.longitudeLatitudeKey.getLatitude() + ", townId=" + townId +
				", storyId=" + storyId + "]";
	}
	
}
