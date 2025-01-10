package hoodclassics.opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="reports")
public class Report {

	@Id
	@GeneratedValue
	@Column(name="report_id")
	private Long reportId;
	

	@Column(name="reporter_user_id")
	private Long reporterUserId;
	

	@Column(name="reported_user_id")
	private Long reportedUserId;
	
	@Column(name="description")
	private String description;
	
	@Column(name="report_category")
	private String reportCategory;
	
	@Column(name="story_id")
	private Long storyId;

	public Report(Long reportId, Long reporterUserId, Long reportedUserId, String description, String reportCategory,
			Long storyId) {
		super();
		this.reportId = reportId;
		this.reporterUserId = reporterUserId;
		this.reportedUserId = reportedUserId;
		this.description = description;
		this.reportCategory = reportCategory;
		this.storyId = storyId;
	}
	
	public Report() {
		super();
		this.reportedUserId = null;
		this.reporterUserId = null;
		this.description = null;
		this.reportCategory = null;
		this.storyId = null;
	}

	public Long getReporterUserId() {
		return reporterUserId;
	}

	public void setReporterUserId(Long reporterUserId) {
		this.reporterUserId = reporterUserId;
	}

	public Long getReportedUserId() {
		return reportedUserId;
	}

	public void setReportedUserId(Long reportedUserId) {
		this.reportedUserId = reportedUserId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getReportCategory() {
		return reportCategory;
	}

	public void setReportCategory(String reportCategory) {
		this.reportCategory = reportCategory;
	}

	public Long getStoryId() {
		return storyId;
	}

	public void setStoryId(Long storyId) {
		this.storyId = storyId;
	}

	public Long getReportId() {
		return reportId;
	}

	@Override
	public String toString() {
		return "Report [reportId=" + reportId + ", reporterUserId=" + reporterUserId + ", reportedUserId="
				+ reportedUserId + ", description=" + description + ", reportCategory=" + reportCategory + ", storyId="
				+ storyId + "]";
	}
	
}