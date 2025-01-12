package hoodclassics.opp.domain;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="contains_picture")
public class ContainsPicture {
	
	@EmbeddedId
	private HrefStoryIdKey hrefStoryIdKey = new HrefStoryIdKey();
	
	public ContainsPicture() {
		super();
		this.hrefStoryIdKey = null;
	}
	
	public ContainsPicture(String href, Long storyId) {
		super();
		this.hrefStoryIdKey.setHref(href);
		this.hrefStoryIdKey.setStoryId(storyId);
	}

	public String getHref() {
		return hrefStoryIdKey.getHref();
	}

	public void setHref(String href) {
		this.hrefStoryIdKey.setHref(href);
	}

	public Long getStoryId() {
		return hrefStoryIdKey.getStoryId();
	}
	
	public void setStoryId(Long storyId) {
		this.hrefStoryIdKey.setStoryId(storyId);
	}

	@Override
	public String toString() {
		return "ContainsPicture [href=" + hrefStoryIdKey.getHref() + ", storyId=" + hrefStoryIdKey.getStoryId() + "]";
	}
	
}
