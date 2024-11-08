package hoodclassics.opp.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hoodclassics.opp.dao.UserRepository;
import hoodclassics.opp.domain.User;
import hoodclassics.opp.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<User> listUsers() {
		return userRepo.findAll();
	}

	// TODO: Dodati informativniju poruku ako je email isti (sad je 501)
	@Override
	public void addUser(User user) {
		userRepo.save(user);
	}

}
