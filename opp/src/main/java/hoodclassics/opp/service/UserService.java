package hoodclassics.opp.service;

import java.util.List;

import hoodclassics.opp.domain.User;

public interface UserService {
	List<User> listUsers();
	void addUser(User user);
}
