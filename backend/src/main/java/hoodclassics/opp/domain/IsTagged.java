package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="is_tagged")
public class IsTagged {

	@Id
	@ManyToOne
	@JoinColumn(name="story_id")
	private Long storyId;
	
	@Id
	@ManyToOne
	@JoinColumn(name="tag_id")
	private Long tagId;
	
	public IsTagged() {
		super();
		this.storyId = null;
		this.tagId = null;
	}

	public IsTagged(Long storyId, Long tagId) {
		super();
		this.storyId = storyId;
		this.tagId = tagId;
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
	public String toString() {
		return "IsTagged [storyId=" + storyId + ", tagId=" + tagId + "]";
	}
	
}
