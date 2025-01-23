package hoodclassics.opp.rest;

import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import hoodclassics.opp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import hoodclassics.opp.domain.HoodClassicsUser;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/list")
	public List<HoodClassicsUser> listAll() {
		return userService.listUsers();
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

	@PostMapping("/town")
	public void addToTown(@RequestBody TownRequest towns) {
		towns.getTowns().forEach(town -> {
			userService.addToTown(town.getLat(), town.getLng());
		});
	}

	public static class TownRequest {
		@JsonProperty("towns")
		private List<Town> towns;

		public List<Town> getTowns() {
			return towns;
		}

		public static class Town {
			private Double lat;
			private Double lng;

			public Double getLat() {
				return lat;
			}
			public Double getLng() {
				return lng;
			}
			public Town() {}
		}
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
