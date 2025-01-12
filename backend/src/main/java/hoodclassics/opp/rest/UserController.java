package hoodclassics.opp.rest;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	public void addToTown(@RequestBody LocationRequest location) {
		userService.addToTown(location.latitude, location.longitude);
	}

	public static class LocationRequest {
		private double latitude;
		private double longitude;
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
