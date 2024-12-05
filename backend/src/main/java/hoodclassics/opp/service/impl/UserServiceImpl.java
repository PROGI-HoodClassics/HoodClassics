package hoodclassics.opp.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import hoodclassics.opp.dao.UserRepository;
import hoodclassics.opp.domain.CustomUser;
import hoodclassics.opp.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<CustomUser> listUsers() {
		return userRepo.findAll();
	}

	@Override
	public void registerUser(String username, String password) {
		String email = null;
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		password = encoder.encode(password);
		userRepo.save(new CustomUser(email, username, password));
	}

	@Override
	public ResponseEntity<String> loginUser(String username, String password) {
		Optional<CustomUser> userOpt = userRepo.findByUsername(username);
		if (userOpt.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("User with username " + username + " not found");
		}

		CustomUser user = userOpt.get();
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		if (!encoder.matches(password, user.getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("Invalid password");
		}
		return ResponseEntity.ok("Login successful");
	}

}
