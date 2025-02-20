package hoodclassics.opp.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/")
public class HomeController {

	@GetMapping({"/", "/map", "/mapRegistered", "/profilePage"})
	public ModelAndView welcome() {
		return new ModelAndView("forward:index.html");
	}
	
	// For testing purposes
	/*
	@GetMapping("/")
	public String welcome() {
		return "Welcome!";
	}
	*/
	
}
