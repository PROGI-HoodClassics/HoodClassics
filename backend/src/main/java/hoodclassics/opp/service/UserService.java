package hoodclassics.opp.service;

import java.util.List;

import hoodclassics.opp.domain.RepositoryUser;
import org.springframework.http.ResponseEntity;

public interface UserService {
	List<RepositoryUser> listUsers();
}
