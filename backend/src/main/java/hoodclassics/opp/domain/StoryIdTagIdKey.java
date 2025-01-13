package hoodclassics.opp.domain;

import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class StoryIdTagIdKey {
	
	private Long storyId;
	private Long tagId;
	
	public StoryIdTagIdKey(Long storyId, Long tagId) {
		super();
		this.storyId = storyId;
		this.tagId = tagId;
	}
	public StoryIdTagIdKey() {
		super();
		this.storyId = null;
		this.tagId = null;
	}
	
	public Long getStoryId() {
		return storyId;
	}
	public void setStoryId(Long storyId) {
		this.storyId = storyId;
	}
	public Long getTagId() {
		return tagId;
	}
	public void setTagId(Long tagId) {
		this.tagId = tagId;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(storyId, tagId);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		StoryIdTagIdKey other = (StoryIdTagIdKey) obj;
		return Objects.equals(storyId, other.storyId) && Objects.equals(tagId, other.tagId);
	}
	
}
