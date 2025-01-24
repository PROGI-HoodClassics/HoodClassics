package hoodclassics.opp.dao;

import hoodclassics.opp.domain.Report;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findAll();
    @Modifying
    @Transactional
    @Query("DELETE FROM Report r WHERE r.storyId = :storyId")
    void deleteByStoryId(@Param("storyId") Long storyId);
}
