package hoodclassics.opp.domain;

import jakarta.persistence.*;

import  hoodclassics.opp.domain.compositeKeys.LocalUserId;
@Entity
@Table(name="local_users")
@IdClass(LocalUserId.class)
public class LocalUser {
	
	// TODO: Multiple @Id annotations may not work as intended, look into @EmbeddedId and @Embeddable
	@Id
	@Column(name="town_id")
	private Long townId;
	
	@Id
	@Column(name="user_id")
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
	public Long getUserId() {
		return userId;
	}

	@Override
	public String toString() {
		return "LocalUser [townId=" + townId + ", userId=" + userId + "]";
	}
	
}
