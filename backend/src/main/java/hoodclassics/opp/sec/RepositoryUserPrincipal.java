package hoodclassics.opp.sec;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

/*
 * This is the object that the code can use to get details about the current user
 * (the one who made some request). The controller can get it with @Principal.
 * It should be wired to the repository/repositories and get the info from there.
 * 
 * TODO: Figure out why it needs to implement these interfaces and should it have a constructor.
 * Then, implement the methods themselves.
 */
public class RepositoryUserPrincipal implements UserDetails, OAuth2User {

	@Override
	public Map<String, Object> getAttributes() {
		return null;
	}

	@Override
	public String getName() {
		return null;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return null;
	}

}
