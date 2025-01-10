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
