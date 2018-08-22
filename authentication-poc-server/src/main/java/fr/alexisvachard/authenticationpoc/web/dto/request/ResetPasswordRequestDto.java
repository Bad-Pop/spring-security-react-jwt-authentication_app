package fr.alexisvachard.authenticationpoc.web.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ResetPasswordRequestDto {

    @NotBlank
    private String token;

    private Long id;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    @NotBlank
    @Size(min = 6, max = 20)
    private String confirmPassword;

    public ResetPasswordRequestDto() {
    }

    public ResetPasswordRequestDto(@NotBlank String token, @NotBlank Long id, @NotBlank @Size(min = 6, max = 20) String password, @NotBlank @Size(min = 6, max = 20) String confirmPassword) {
        this.token = token;
        this.id = id;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
