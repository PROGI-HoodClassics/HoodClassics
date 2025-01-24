package hoodclassics.opp.unitTests;

import hoodclassics.opp.dao.UserRepository;
import hoodclassics.opp.domain.HoodClassicsUser;
import hoodclassics.opp.service.impl.RegistrationServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

class RegistrationServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private RegistrationServiceImpl registrationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUserUsernamePassword_Success() {
        String username = "testuser";
        String password = "password123";
        HoodClassicsUser newUser = new HoodClassicsUser(null, username, password, false);

        when(userRepository.findByUsername(eq(username))).thenReturn(Optional.empty());
        when(userRepository.save(any(HoodClassicsUser.class))).thenReturn(newUser);

        ResponseEntity<String> response = registrationService.registerUserUsernamePassword(username, password);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("OK", response.getBody());

        Mockito.verify(userRepository).save(any(HoodClassicsUser.class));
    }

    @Test
    void testRegisterUserUsernamePassword_UsernameTaken() {
        String username = "existinguser";
        String password = "password123";
        HoodClassicsUser existingUser = new HoodClassicsUser("1", username, password, false);

        when(userRepository.findByUsername(eq(username))).thenReturn(Optional.of(existingUser));

        ResponseEntity<String> response = registrationService.registerUserUsernamePassword(username, password);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertEquals("That username is already taken", response.getBody());

        Mockito.verify(userRepository, Mockito.never()).save(any(HoodClassicsUser.class));
    }

    @Test
    void testPasswordEncryption() {
        String password = "plaintextpassword";
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String encryptedPassword = encoder.encode(password);

        assertNotNull(encryptedPassword);
        assertNotEquals(password, encryptedPassword);
        assertTrue(encoder.matches(password, encryptedPassword));
    }
}

