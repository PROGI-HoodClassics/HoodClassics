package hoodclassics.opp.sec;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Configuration
public class WebSecurityConfig {
	
	private UsernamePasswordService usernamePasswordService;
	private OAuth2Service oAuth2Service;
	private PasswordEncoder passwordEncoder;
	private ClientRegistrationRepository clientRegistrationRepository;
	
	// Supposed to be better than @Autowire ?
	public WebSecurityConfig(UsernamePasswordService usernamePasswordService,
			OAuth2Service oAuth2Service,
			PasswordEncoder passwordEncoder,
			ClientRegistrationRepository clientRegistrationRepository) {
		this.usernamePasswordService = usernamePasswordService;
		this.oAuth2Service = oAuth2Service;
		this.passwordEncoder = passwordEncoder;
		this.clientRegistrationRepository = clientRegistrationRepository;
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
		.csrf(AbstractHttpConfigurer::disable)
		.authorizeHttpRequests(authorizeRequests -> authorizeRequests
				.requestMatchers("/", "/index.html", "/assets/**", "/oauth2/**", "/login/**",
						"/register/**", "/error/**", "/api/story/stories/**", "api/story/\\d+").permitAll()
				.anyRequest().authenticated())
		.oauth2Login(config -> config
				.clientRegistrationRepository(clientRegistrationRepository)
				.userInfoEndpoint(userInfo -> userInfo.userService(oAuth2Service))
				.successHandler(new SimpleUrlAuthenticationSuccessHandler("/mapRegistered")))
		.formLogin(config -> config
				.defaultSuccessUrl("/", true)
				.failureHandler(new LoginAuthenticationFailureHandler()));
				
		return http.build();
	}

}
