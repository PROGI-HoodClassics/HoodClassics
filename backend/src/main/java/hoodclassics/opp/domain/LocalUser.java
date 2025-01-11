package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="local_users")
public class LocalUser {
	
	@EmbeddedId
	private UserIdTownIdKey userIdTownIdKey;
	
	public LocalUser(Long townId, Long userId) {
		super();
		this.userIdTownIdKey.setTownId(userId);
		this.userIdTownIdKey.setUserId(userId);
	}
	
	public LocalUser() {
		super();
		this.userIdTownIdKey = new UserIdTownIdKey();
	}
	
	public Long getTownId() {
		return this.userIdTownIdKey.getTownId();
	}
	public Long getUserId() {
		return this.userIdTownIdKey.getUserId();
	}

	@Override
	public String toString() {
		return "LocalUser [townId=" + this.userIdTownIdKey.getTownId() + ", userId=" 
	+ this.userIdTownIdKey.getUserId() + "]";
	}
	
}
