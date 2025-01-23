package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="pictures")
public class Picture {
	
	@Id
	@Column(name="href", unique=true)
	private String href;
	
	public Picture() {
		super();
		this.href = null;
	}
	
	public Picture(String href) {
		super();
		this.href = href;
	}

	public String getHref() {
		return href;
	}

	@Override
	public String toString() {
		return "Picture [href=" + href + "]";
	}

}
