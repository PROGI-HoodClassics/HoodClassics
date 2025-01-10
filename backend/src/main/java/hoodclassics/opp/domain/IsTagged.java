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
	private Story story;
	
	@Id
	@ManyToOne
	@JoinColumn(name="tag_id")
	private Tag tag;
	
	public IsTagged() {
		super();
		this.story = null;
		this.tag = null;
	}

	public IsTagged(Long storyId, Long tagId) {
		super();
		this.story = story;
		this.tag = tag;
	}

	public Long getStoryId() {
		return story.getStoryId();
	}

	public Long getTagId() {
		return tag.getTagId();
	}

	@Override
	public String toString() {
		return "IsTagged [storyId=" + story.getStoryId() + ", tagId=" + tag.getTagId() + "]";
	}
	
}
