package hoodclassics.opp.domain.compositeKeys;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class LocalUserId implements Serializable {

    private Long townId;
    private Long userId;

    public LocalUserId() {}

    public LocalUserId(Long townId, Long userId) {
        this.townId = townId;
        this.userId = userId;
    }

    public Long getTownId() {
        return townId;
    }

    public void setTownId(Long townId) {
        this.townId = townId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LocalUserId that = (LocalUserId) o;
        return Objects.equals(townId, that.townId) && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(townId, userId);
    }
}

