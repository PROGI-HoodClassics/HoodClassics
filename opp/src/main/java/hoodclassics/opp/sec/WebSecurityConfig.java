package hoodclassics.opp.sec;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf(csrf -> csrf.disable()) // TODO: Naći bolji način za "odzabraniti" (ne vratiti 403) POST requestove
			.authorizeHttpRequests(authorizeRequests -> authorizeRequests
					.requestMatchers("/").permitAll()
					.anyRequest().authenticated()
					)
			.oauth2Login(config -> config.clientRegistrationRepository(this.clientRegistrationRepository())
					.successHandler(new SimpleUrlAuthenticationSuccessHandler("/")));
		
		return http.build();
	}
	
	@Bean
	public ClientRegistrationRepository clientRegistrationRepository() {
		return new InMemoryClientRegistrationRepository(this.googleClientRegistration());
	}

 	private ClientRegistration googleClientRegistration() {
 		return ClientRegistration.withRegistrationId("google")
 			.clientId(this.getClientID("google"))
 			.clientSecret(this.getClientSecret("google"))
 			.clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
 			.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
 			.redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
 			.scope("openid", "profile", "email", "address", "phone")
 			.authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
 			.tokenUri("https://www.googleapis.com/oauth2/v4/token")
 			.userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
 			.userNameAttributeName(IdTokenClaimNames.SUB)
 			.jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
 			.clientName("Google")
 			.build();
	}
 	
 	/*
 	 * TODO: Naći bolji način za izvesti ovo. Možda povezati s bazom podataka.
 	 * Trenutno samo čita iz google.txt datoteke (nije na GitHubu).
 	 */
 	private String getClientID(String provider) {
		List<String> lines = new ArrayList<>();
		try {
			lines = Files.readAllLines(Paths.get("src/main/resources/secrets/" + provider + ".txt"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return lines.get(0);
 	}
 	
 	private String getClientSecret(String provider) {
 		List<String> lines = new ArrayList<>();
		try {
			lines = Files.readAllLines(Paths.get("src/main/resources/secrets/" + provider + ".txt"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return lines.get(1);
 	}
	
}
