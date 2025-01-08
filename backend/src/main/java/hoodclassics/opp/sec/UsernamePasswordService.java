package hoodclassics.opp.sec;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import hoodclassics.opp.dao.UserRepository;
import hoodclassics.opp.domain.HoodClassicsUser;

@Service
public class UsernamePasswordService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		HoodClassicsUser user = userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
				"No user with username " + username));
		// TODO: Check if moderator and add authorities here
		return new User(username, user.getPassword(), Collections.emptyList());
	}

}
