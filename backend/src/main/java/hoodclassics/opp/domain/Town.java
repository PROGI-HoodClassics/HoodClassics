package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="towns")
public class Town {

	@Id
	@GeneratedValue
	@Column(name="town_id")
	private Long townId;
	
	@Column(name="town_name")
	private String townName;
	
	@Column(name="county")
	private String county;
	
	@Column(name="state")
	private String state;
	
	@Column(name="country_id")
	private Long countryId;
	
	public Town() {
		super();
		this.townName = null;
		this.county = null;
		this.countryId = null;
		this.state = null;
	}

	public Town(String townName, String county, String state, Long countryId) {
		super();
		this.townName = townName;
		this.county = county;
		this.state = state;
		this.countryId = countryId;
	}
	
	public String getTownName() {
		return townName;
	}
	public void setTownName(String townName) {
		this.townName = townName;
	}
	public String getCounty() {
		return county;
	}
	public void setCounty(String county) {
		this.county = county;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public Long getCountryId() {
		return countryId;
	}
	public Long getTownId() {
		return townId;
	}

	@Override
	public String toString() {
		return "Town [townId=" + townId + ", townName=" + townName + ", county=" + county + ", state=" + state
				+ ", countryId=" + countryId + "]";
	}
	
}
