package hoodclassics.opp.sec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import hoodclassics.opp.dao.UserRepository;
import hoodclassics.opp.domain.HoodClassicsUser;

@Service
public class OAuth2Service implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
		OAuth2User user = delegate.loadUser(userRequest);
		
		String name = user.getAttribute("given_name");
		String surname = user.getAttribute("family_name");
		String email = user.getAttribute("email");
		String username = name + surname;
		HoodClassicsUser newUser = new HoodClassicsUser(email, username);

		// TODO: Implement user authorities (in the DB) and add them to the created user here
		if (!userRepo.findByUsername(username).isPresent()) {
			userRepo.save(newUser);
		}
		
		return user;
	}

}
