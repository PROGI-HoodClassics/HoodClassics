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

	// TODO: Multiple @Id annotations may not work as intended, look into @EmbeddedId and @Embeddable
	@Id
	@Column(name="story_id")
	private Long storyId;
	
	@Id
	@Column(name="tag_id")
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

	public Long getTagId() {
		return tagId;
	}

	@Override
	public String toString() {
		return "IsTagged [storyId=" + storyId + ", tagId=" + tagId + "]";
	}
	
}
