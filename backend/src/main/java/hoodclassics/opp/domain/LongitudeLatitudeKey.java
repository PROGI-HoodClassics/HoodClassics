package hoodclassics.opp.domain;

import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class LongitudeLatitudeKey {

	private Double longitude;
	private Double latitude;
	
	public LongitudeLatitudeKey(Double longitude, Double latitude) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
	}
	public LongitudeLatitudeKey() {
		super();
		this.longitude = null;
		this.latitude = null;
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
	
	@Override
	public int hashCode() {
		return Objects.hash(latitude, longitude);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LongitudeLatitudeKey other = (LongitudeLatitudeKey) obj;
		return Objects.equals(latitude, other.latitude) && Objects.equals(longitude, other.longitude);
	}
	
	
	
}
