package hoodclassics.opp.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
}
