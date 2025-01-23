package hoodclassics.opp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import hoodclassics.opp.domain.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {

}
