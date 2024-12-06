package hoodclassics.opp.service;

import java.util.List;

import hoodclassics.opp.domain.CustomUser;
import org.springframework.http.ResponseEntity;

public interface UserService {
	List<CustomUser> listUsers();
	void registerUser(String username, String password);
	ResponseEntity<String> loginUser(String username, String password);
}
