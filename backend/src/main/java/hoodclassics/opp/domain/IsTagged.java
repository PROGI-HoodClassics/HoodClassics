package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="is_tagged")
public class IsTagged {

	@EmbeddedId
	private StoryIdTagIdKey storyIdTagIdKey;
	
	public IsTagged() {
		super();
		this.storyIdTagIdKey = new StoryIdTagIdKey();
	}

	public IsTagged(Long storyId, Long tagId) {
		super();
		this.storyIdTagIdKey.setStoryId(storyId);
		this.storyIdTagIdKey.setTagId(tagId);
	}

	public Long getStoryId() {
		return this.getStoryId();
	}

	public Long getTagId() {
		return this.getTagId();
	}

	@Override
	public String toString() {
		return "IsTagged [storyId=" + this.storyIdTagIdKey.getStoryId() 
		+ ", tagId=" + this.storyIdTagIdKey.getTagId() + "]";
	}
	
}
