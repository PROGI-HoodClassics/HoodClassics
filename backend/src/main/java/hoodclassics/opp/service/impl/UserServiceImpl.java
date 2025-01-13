package hoodclassics.opp.service.impl;

import java.util.List;

import hoodclassics.opp.dao.LocalUserRepository;
import hoodclassics.opp.dao.TownRepository;
import hoodclassics.opp.domain.LocalUser;
import hoodclassics.opp.domain.Town;
import hoodclassics.opp.service.GeocodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import hoodclassics.opp.dao.UserRepository;
import hoodclassics.opp.domain.HoodClassicsUser;
import hoodclassics.opp.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private TownRepository townRepo;
	@Autowired
	private LocalUserRepository localUserRepo;
	@Autowired
	private GeocodingService geocodingService;

	@Override
	public List<HoodClassicsUser> listUsers() {
		return userRepo.findAll();
	}

	@Override
	public void addToTown(double latitude, double longitude) {
		String address = geocodingService.reverseGeocode(latitude, longitude);
		String country = geocodingService.extractCountryFromAddress(address);
		String townName = geocodingService.extractLocationFromAddress(address);

		Town town = townRepo.findByTownName(townName);
		if (town == null) {
			Town newTown = new Town();
			newTown.setTownName(townName);
			newTown.setCounty(null);
			newTown.setState(null);
			town = newTown;

			townRepo.save(newTown);
		}
		Long townId = town.getTownId();
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		boolean oauthUser = username.contains("@gmail.com");
		Long userId = null;

		//checks email for OAuth users
		if (oauthUser) {
			if (userRepo.findByEmail(username).isPresent()) {
				userId = userRepo.findByEmail(username).get().getUserId();
			} else {
				System.out.println("User not found");
			}
		}
		//checks username for other users
		else {
			if (userRepo.findByUsername(username).isPresent()) {
				userId = userRepo.findByUsername(username).get().getUserId();
			} else {
				System.out.println("User not found");
			}
		}

		if (!localUserRepo.existsByUserIdTownIdKey_TownIdAndUserIdTownIdKey_UserId(townId, userId)) {
			LocalUser newUser = new LocalUser(townId, userId);
			localUserRepo.save(newUser);
		} else {
			System.out.println("LocalUser already exists.");
		}
	}

}
