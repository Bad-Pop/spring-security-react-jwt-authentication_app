package fr.alexisvachard.authenticationpoc.web.admin.dto;

import fr.alexisvachard.authenticationpoc.model.Role;
import fr.alexisvachard.authenticationpoc.model.User;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class UserDto {

    private String username;
    private String email;
    private LocalDate accountCreationDate;
    private boolean isUsingTwoFA;
    List<String> roles;

    //TODO ROLES

    public UserDto() {
    }

    public UserDto(String username, String email, LocalDate accountCreationDate, boolean isUsingTwoFA, Set<Role> roles) {
        this.username = username;
        this.email = email;
        this.accountCreationDate = accountCreationDate;
        this.isUsingTwoFA = isUsingTwoFA;
        this.roles = this.exctractRoles(roles);
    }

    public UserDto(User user){
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.accountCreationDate = user.getAccountCreationDate();
        this.isUsingTwoFA = user.isUsingTwoFA();
        this.roles = this.exctractRoles(user.getRoles());
    }

    private List<String> exctractRoles(Set<Role> roles){

        List<String> userDtoRoles = new ArrayList<>();

        for(Role r : roles){
            userDtoRoles.add(r.getRoleName().toString().substring(5));
        }

        return userDtoRoles;
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

    public LocalDate getAccountCreationDate() {
        return accountCreationDate;
    }

    public void setAccountCreationDate(LocalDate accountCreationDate) {
        this.accountCreationDate = accountCreationDate;
    }

    public boolean isUsingTwoFA() {
        return isUsingTwoFA;
    }

    public void setUsingTwoFA(boolean usingTwoFA) {
        isUsingTwoFA = usingTwoFA;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
