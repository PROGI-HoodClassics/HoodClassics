package hoodclassics.opp.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="stories")
public class Story {

    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String text;
    private Float longitude;
    private Float latitude;

    public Story() {
        this.title = null;
        this.text = null;
        this.longitude = null;
        this.latitude = null;
    }

    public Story(String title, String text, Float longitude, Float latitude) {
        this.title = title;
        this.text = text;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public Float getLongitude() {
        return longitude;
    }
    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }
    public Float getLatitude() {
        return latitude;
    }
    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Story{" + "id=" + id + ", title='" + title + '\'' + ", text='" + text + '\'' +
                ", longitude=" + longitude + ", latitude=" + latitude + '}';
    }
}
