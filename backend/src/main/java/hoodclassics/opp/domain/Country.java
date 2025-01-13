package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="countries")
public class Country {

	@Id
	@GeneratedValue
	@Column(name="country_id")
	private Long countryId;
	
	@Column(unique=true, name="country_name")
	private String countryName;

	public Country(String countryName) {
		super();
		this.countryName = countryName;
	}
	
	public Country() {
		super();
		this.countryName = null;
	}
	
	public String getCountryName() {
		return countryName;
	}
	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	public Long getCountryId() {
		return countryId;
	}

	@Override
	public String toString() {
		return "Country [countryId=" + countryId + ", countryName=" + countryName + "]";
	}
	
}
