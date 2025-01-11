package hoodclassics.opp.domain;

import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class UserIdTownIdKey {
	
	private Long userId;
	private Long townId;
	
	public UserIdTownIdKey(Long userId, Long townId) {
		super();
		this.userId = userId;
		this.townId = townId;
	}
	public UserIdTownIdKey() {
		super();
		this.userId = null;
		this.townId = null;
	}
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getTownId() {
		return townId;
	}
	public void setTownId(Long townId) {
		this.townId = townId;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(userId, townId);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserIdTownIdKey other = (UserIdTownIdKey) obj;
		return Objects.equals(userId, other.userId) && Objects.equals(townId, other.townId);
	}
	
}
