package fr.alexisvachard.authenticationpoc.web.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RegisterRequestDto {

    @Size(min = 4, max = 16)
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    public RegisterRequestDto() {
    }

    public RegisterRequestDto(@Size(min = 4, max = 16) String username, @NotBlank @Email String email, @NotBlank @Size(min = 6, max = 20) String password) {
        this.username = username;
        this.email = email;
        this.password = password;
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
}
