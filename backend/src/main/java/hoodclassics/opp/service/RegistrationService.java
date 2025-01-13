package hoodclassics.opp.service;

import org.springframework.http.ResponseEntity;

public interface RegistrationService {
	ResponseEntity<String> registerUserUsernamePassword(String username, String password);
}
