package fr.alexisvachard.authenticationpoc.model;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
        name = "USER",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        }
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 4, max = 16)
    private String username;

    @NaturalId
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    private boolean isUsingTwoFA;

    private String twoFASecret;

    @Column(columnDefinition = "DATE NOT NULL")
    private LocalDate accountCreationDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "USER_ROLE",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public User() {
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isUsingTwoFA = false;
        this.accountCreationDate = initiAccountCreationDate();
    }

    public User(String username, String email, LocalDate accountCreationDate) {
        this.username = username;
        this.email = email;
        this.accountCreationDate = accountCreationDate;
    }

    public User(String username, String email, String password, boolean isUsingTwoFA, String twoFASecret) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isUsingTwoFA = isUsingTwoFA;
        this.twoFASecret = twoFASecret;
        this.accountCreationDate = initiAccountCreationDate();
    }

    public User(String username, String email, String password, boolean isUsingTwoFA, String twoFASecret, LocalDate accountCreationDate) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isUsingTwoFA = isUsingTwoFA;
        this.twoFASecret = twoFASecret;
        this.accountCreationDate = accountCreationDate;
    }

    private LocalDate initiAccountCreationDate(){
        return LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public boolean isUsingTwoFA() {
        return isUsingTwoFA;
    }

    public void setUsingTwoFA(boolean usingTwoFA) {
        isUsingTwoFA = usingTwoFA;
    }

    public String getTwoFASecret() {
        return twoFASecret;
    }

    public void setTwoFASecret(String twoFASecret) {
        this.twoFASecret = twoFASecret;
    }

    public LocalDate getAccountCreationDate() {
        return accountCreationDate;
    }

    public void setAccountCreationDate(LocalDate accountCreationDate) {
        this.accountCreationDate = accountCreationDate;
    }
}
