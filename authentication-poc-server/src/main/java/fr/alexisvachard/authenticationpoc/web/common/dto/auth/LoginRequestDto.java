package fr.alexisvachard.authenticationpoc.web.common.dto.auth;

import javax.validation.constraints.NotBlank;

public class LoginRequestDto {

    @NotBlank
    private String usernameOrEmail;

    @NotBlank
    private String password;

    private boolean rememberMe;

    private int twoFACode;

    public LoginRequestDto() {
    }

    public LoginRequestDto(@NotBlank String usernameOrEmail, @NotBlank String password) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
        rememberMe = false;
    }

    public LoginRequestDto(@NotBlank String usernameOrEmail, @NotBlank String password, boolean rememberMe) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
        this.rememberMe = rememberMe;
    }

    public LoginRequestDto(@NotBlank String usernameOrEmail, @NotBlank String password, boolean rememberMe, int twoFACode) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
        this.rememberMe = rememberMe;
        this.twoFACode = twoFACode;
    }

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isRememberMe() {
        return rememberMe;
    }

    public void setRememberMe(boolean rememberMe) {
        this.rememberMe = rememberMe;
    }

    public int getTwoFACode() {
        return twoFACode;
    }

    public void setTwoFACode(int twoFACode) {
        this.twoFACode = twoFACode;
    }
}
