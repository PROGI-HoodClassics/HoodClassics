package hoodclassics.opp.sec;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import hoodclassics.opp.dao.UserRepository;
import hoodclassics.opp.domain.RepositoryUser;

@Service
public class UsernamePasswordService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		RepositoryUser user = userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
				"No user with username " + username));
		// TODO: Implement user authorities (in the DB) and return them here
		return new User(username, user.getPassword(), Collections.emptyList());
	}

}
