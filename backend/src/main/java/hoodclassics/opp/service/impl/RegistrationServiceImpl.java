package hoodclassics.opp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import hoodclassics.opp.dao.UserRepository;
import hoodclassics.opp.domain.RepositoryUser;
import hoodclassics.opp.service.RegistrationService;

@Service
public class RegistrationServiceImpl implements RegistrationService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public ResponseEntity<String> registerUserUsernamePassword(String username, String password) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		password = encoder.encode(password);
		RepositoryUser newUser = new RepositoryUser(null, username, password);
		if (userRepository.findByUsername(username).isEmpty()) {
			userRepository.save(newUser);
			return new ResponseEntity<String>("OK", HttpStatus.OK);
		}
		return new ResponseEntity<String>("That username is already taken", HttpStatus.FORBIDDEN);
	}

}
