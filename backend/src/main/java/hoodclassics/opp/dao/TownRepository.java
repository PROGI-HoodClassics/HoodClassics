package hoodclassics.opp.dao;

import hoodclassics.opp.domain.HoodClassicsUser;
import hoodclassics.opp.domain.Town;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TownRepository extends JpaRepository<Town, Long> {
    Town findByTownName(String townName);
}
