package hoodclassics.opp.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hoodclassics.opp.domain.User;
import hoodclassics.opp.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/list")
	public List<User> listAll() {
		return userService.listUsers();
	}
	
	@PostMapping("/add")
	public void addUser(@RequestBody User user) {
		userService.addUser(user);
	}
	
}
