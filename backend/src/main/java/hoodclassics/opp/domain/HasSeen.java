package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="has_seen")
public class HasSeen {
	
	@Id
	@OneToMany
	@JoinColumn(name="user_id")
	private Long userId;
	
	@Id
	@OneToMany
	@JoinColumn(name="story_id")
	private Long storyId;
	
	@Column(name="liked")
	private Boolean liked;
	
	public HasSeen() {
		this.liked = null;
		this.userId = null;
		this.storyId = null;
	}

	public HasSeen(Long userId, Long storyId, Boolean liked) {
		super();
		this.userId = userId;
		this.storyId = storyId;
		this.liked = liked;
	}

	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getStoryId() {
		return storyId;
	}
	public void setStoryId(Long storyId) {
		this.storyId = storyId;
	}
	public Boolean getLiked() {
		return liked;
	}
	public void setLiked(Boolean liked) {
		this.liked = liked;
	}

	@Override
	public String toString() {
		return "HasSeen [userId=" + userId + ", storyId=" + storyId + ", liked=" + liked + "]";
	}
	
}
