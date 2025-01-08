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
	private Long townId;
	
	@Id
	@ManyToOne
	@JoinColumn(name="user_id")
	private Long userId;
	
	public LocalUser(Long townId, Long userId) {
		super();
		this.townId = townId;
		this.userId = userId;
	}
	
	public LocalUser() {
		super();
		this.townId = null;
		this.userId = null;
	}
	
	public Long getTownId() {
		return townId;
	}
	public void setTownId(Long townId) {
		this.townId = townId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "LocalUser [townId=" + townId + ", userId=" + userId + "]";
	}
	
}
