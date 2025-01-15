package hoodclassics.opp.rest;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import hoodclassics.opp.domain.HoodClassicsUser;
import hoodclassics.opp.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/list")
	public List<HoodClassicsUser> listAll() {
		return userService.listUsers();
	}

	@PostMapping("/town")
	public void addToTown(@RequestBody List<LocationRequest> locations) {
		for (LocationRequest location : locations) {
			userService.addToTown(location.latitude, location.longitude);
		}
	}

	@GetMapping("/moderator")
	public ResponseEntity<Boolean> isModerator() {
		boolean isModerator = userService.isModerator();
		if (!userService.exists()) {
			return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
		}
		if (isModerator) {
			return new ResponseEntity<>(true, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
	}

	public static class LocationRequest {
		public Double latitude;
		public Double longitude;
	}

	// Was used for testing
	/*
	@GetMapping("/authoritiestest")
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return SecurityContextHolder.getContext().getAuthentication().getAuthorities();
	}
	
	@GetMapping("/nametest")
	public String getName() {
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
	*/
	
}
