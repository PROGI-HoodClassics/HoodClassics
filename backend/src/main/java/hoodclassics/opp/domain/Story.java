package hoodclassics.opp.domain;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="stories")
public class Story {
	
	@Id
	@GeneratedValue
	@Column(name="story_id")
	private Long storyId;
	
	@Column(name="text")
	private String text;
	
	@Column(name="title")
	private String title;
	
	@Column(name="upload_timestamp")
	private Timestamp uploadTimestamp;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private Long userId;
	
	@ManyToOne
	@JoinColumn(name="town_id")
	private Long townId;

	public Story(String text, String title, Timestamp uploadTimestamp, Long userId, Long townId) {
		super();
		this.text = text;
		this.title = title;
		this.uploadTimestamp = uploadTimestamp;
		this.userId = userId;
		this.townId = townId;
	}
	
	public Story() {
		super();
		this.text = null;
		this.title = null;
		this.uploadTimestamp = null;
		this.userId = null;
		this.townId = null;
	}

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Timestamp getUploadTimestamp() {
		return uploadTimestamp;
	}
	public void setUploadTimestamp(Timestamp uploadTimestamp) {
		this.uploadTimestamp = uploadTimestamp;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getTownId() {
		return townId;
	}
	public void setTownId(Long townId) {
		this.townId = townId;
	}
	public Long getStoryId() {
		return storyId;
	}

	@Override
	public String toString() {
		return "Story [storyId=" + storyId + ", text=" + text + ", title=" + title + ", uploadTimestamp="
				+ uploadTimestamp + ", userId=" + userId + ", townId=" + townId + "]";
	}
	
}
