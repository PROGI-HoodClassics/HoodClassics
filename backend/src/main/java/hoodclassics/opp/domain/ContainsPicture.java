package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="contains_picture")
public class ContainsPicture {

	// TODO: Multiple @Id annotations may be risky. Refactor to use @EmbeddedId and @Embeddable
	@Id
	@ManyToOne
	@JoinColumn(name="href")
	private String href;
	
	@Id
	@ManyToOne
	@JoinColumn(name="story_id")
	private Long storyId;
	
	public ContainsPicture() {
		super();
		this.href = null;
		this.storyId = null;
	}
	
	public ContainsPicture(String href, Long storyId) {
		super();
		this.href = href;
		this.storyId = storyId;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public Long getStoryId() {
		return storyId;
	}

	public void setStoryId(Long storyId) {
		this.storyId = storyId;
	}

	@Override
	public String toString() {
		return "ContainsPicture [href=" + href + ", storyId=" + storyId + "]";
	}
	
}
