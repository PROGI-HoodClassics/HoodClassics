package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="local_users")
public class LocalUser {
	
	@Id
	@ManyToOne
	@JoinColumn(name="town_id")
	private Town town;
	
	@Id
	@ManyToOne
	@JoinColumn(name="user_id")
	private HoodClassicsUser user;
	
	public LocalUser(Long townId, Long userId) {
		super();
		this.town = town;
		this.user = user;
	}
	
	public LocalUser() {
		super();
		this.town = null;
		this.user = null;
	}
	
	public Long getTownId() {
		return town.getTownId();
	}
	public Long getUserId() {
		return user.getUserId();
	}

	@Override
	public String toString() {
		return "LocalUser [townId=" + town.getTownId() + ", userId=" + user.getUserId() + "]";
	}
	
}
