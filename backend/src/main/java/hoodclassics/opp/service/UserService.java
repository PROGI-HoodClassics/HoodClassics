package hoodclassics.opp.service;

import java.util.List;

import hoodclassics.opp.domain.HoodClassicsUser;
import org.springframework.http.ResponseEntity;

public interface UserService {
	List<HoodClassicsUser> listUsers();
    void addToTown(double latitude, double longitude);
}
