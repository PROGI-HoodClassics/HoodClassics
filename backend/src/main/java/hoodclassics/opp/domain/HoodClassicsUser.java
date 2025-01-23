package hoodclassics.opp.domain;

import org.springframework.lang.NonNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
<<<<<<<< HEAD:backend/src/main/java/hoodclassics/opp/domain/RepositoryUser.java
public class RepositoryUser {
========
public class HoodClassicsUser {
>>>>>>>> dev:backend/src/main/java/hoodclassics/opp/domain/HoodClassicsUser.java

	@Id
	@GeneratedValue
	@Column(name="user_id")
	private Long userId;
	
	@Column(unique=true, name="email")
	private String email;
	
	@Column(unique=true, name="username")
	@NonNull
	private String username;
	
	@Column(name="password")
	private String password;
	
	@Column(name="is_moderator")
	private Boolean isModerator;

<<<<<<<< HEAD:backend/src/main/java/hoodclassics/opp/domain/RepositoryUser.java
	public RepositoryUser(String email, String username, String password) {
========
	public HoodClassicsUser(String email, String username, String password, boolean isModerator) {
		super();
>>>>>>>> dev:backend/src/main/java/hoodclassics/opp/domain/HoodClassicsUser.java
		this.email = email;
		this.username = username;
		this.password = password;
		this.isModerator = false;
	}
	
<<<<<<<< HEAD:backend/src/main/java/hoodclassics/opp/domain/RepositoryUser.java
	public RepositoryUser(String email, String username) {
========
	public HoodClassicsUser(String email, String username) {
		super();
>>>>>>>> dev:backend/src/main/java/hoodclassics/opp/domain/HoodClassicsUser.java
		this.email = email;
		this.username = username;
		this.password = null;
		this.isModerator = false;
	}

	//Spring ovo treba ali ne znam zašto
<<<<<<<< HEAD:backend/src/main/java/hoodclassics/opp/domain/RepositoryUser.java
	public RepositoryUser() {
========
	public HoodClassicsUser() {
		super();
>>>>>>>> dev:backend/src/main/java/hoodclassics/opp/domain/HoodClassicsUser.java
		this.email = null;
		this.username = null;
		this.password = null;
		this.isModerator = false;
	}

	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Boolean getIsModerator() {
		return isModerator;
	}
	public void setIsModerator(Boolean isModerator) {
		this.isModerator = isModerator;
	}
	public Long getUserId() {
		return userId;
	}
	
	@Override
	public String toString() {
		return "User [id=" + userId + ", email=" + email + ", username="
				+ username + "]";
	}
	
}
