package hoodclassics.opp.domain;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class HrefStoryIdKey implements Serializable {
	private String href;
	private Long storyId;
	
	public HrefStoryIdKey(String href, Long storyId) {
		this.href = href;
		this.storyId = storyId;
	}
	
	public HrefStoryIdKey() {
		this.href = null;
		this.storyId = null;
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
	public int hashCode() {
		return Objects.hash(href, storyId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		HrefStoryIdKey other = (HrefStoryIdKey) obj;
		return Objects.equals(href, other.href) && Objects.equals(storyId, other.storyId);
	}
}
