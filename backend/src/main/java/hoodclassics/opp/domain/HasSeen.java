package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="has_seen")
public class HasSeen {
	
	@EmbeddedId
	private UserIdStoryIdKey userIdStoryIdKey = new UserIdStoryIdKey();
	
	@Column(name="liked")
	private Boolean liked;
	
	public HasSeen() {
		this.liked = null;
		this.userIdStoryIdKey = new UserIdStoryIdKey();
		this.liked = false;
	}

	public HasSeen(Long userId, Long storyId, Boolean liked) {
		super();
		this.userIdStoryIdKey.setUserId(userId);
		this.userIdStoryIdKey.setStoryId(storyId);
		this.liked = liked;
	}

	public Long getUserId() {
		return this.userIdStoryIdKey.getUserId();
	}
	public void setUserId(Long userId) {
		this.userIdStoryIdKey.setUserId(userId);
	}
	public Long getStoryId() {
		return this.userIdStoryIdKey.getStoryId();
	}
	public void setStoryId(Long storyId) {
		this.userIdStoryIdKey.setStoryId(storyId);
	}
	public Boolean getLiked() {
		return liked;
	}
	public void setLiked(Boolean liked) {
		this.liked = liked;
	}

	@Override
	public String toString() {
		return "HasSeen [userId=" + this.userIdStoryIdKey.getUserId() 
		+ ", storyId=" + this.userIdStoryIdKey.getStoryId() + ", liked=" + liked + "]";
	}
	
}
