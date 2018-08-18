package fr.alexisvachard.authenticationpoc.web.secure.dto.account;

public class TwoFAStatusDto {

    private boolean isUsingTwoFA;

    public TwoFAStatusDto() {
    }

    public TwoFAStatusDto(boolean isUsingTwoFA) {
        this.isUsingTwoFA = isUsingTwoFA;
    }

    public boolean isUsingTwoFA() {
        return isUsingTwoFA;
    }

    public void setUsingTwoFA(boolean usingTwoFA) {
        isUsingTwoFA = usingTwoFA;
    }
}
