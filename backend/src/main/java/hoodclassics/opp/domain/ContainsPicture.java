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
	
	// TODO: Multiple @Id annotations may not work as intended, look into @EmbeddedId and @Embeddable
	@Id
	@Column(name="href")
	private String href;
	
	@Id
	@Column(name="story_id")
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

	@Override
	public String toString() {
		return "ContainsPicture [href=" + href + ", storyId=" + storyId + "]";
	}
	
}
