package hoodclassics.opp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hoodclassics.opp.service.RegistrationService;

@RestController
@RequestMapping("/register")
public class RegistrationController {
	
	@Autowired
	private RegistrationService registrationService;
	
	@PostMapping
	public ResponseEntity<String> registerUsernamePassword(@RequestParam String username, @RequestParam String password) {
		return registrationService.registerUserUsernamePassword(username, password);
	}
	
}
