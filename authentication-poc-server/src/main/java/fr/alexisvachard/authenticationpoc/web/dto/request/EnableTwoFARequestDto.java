package fr.alexisvachard.authenticationpoc.web.dto.request;

public class EnableTwoFARequestDto {

    private String password;
    private int twoFACode;

    public EnableTwoFARequestDto() {
    }

    public EnableTwoFARequestDto(String password, int twoFACode) {
        this.password = password;
        this.twoFACode = twoFACode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getTwoFACode() {
        return twoFACode;
    }

    public void setTwoFACode(int twoFACode) {
        this.twoFACode = twoFACode;
    }
}
