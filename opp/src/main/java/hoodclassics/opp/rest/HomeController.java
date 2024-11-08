package hoodclassics.opp.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {

	@GetMapping("/")
	public String welcome() {
		return "Ovdje bi trebala frontend stranica";
	}
	
}
