package hoodclassics.opp.domain;

import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class UserIdStoryIdKey {

	private Long userId;
	private Long storyId;
	
	public UserIdStoryIdKey(Long userId, Long storyId) {
		super();
		this.userId = userId;
		this.storyId = storyId;
	}
	public UserIdStoryIdKey() {
		super();
		this.userId = null;
		this.storyId = null;
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
	@Override
	public int hashCode() {
		return Objects.hash(storyId, userId);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserIdStoryIdKey other = (UserIdStoryIdKey) obj;
		return Objects.equals(storyId, other.storyId) && Objects.equals(userId, other.userId);
	}
	
}
