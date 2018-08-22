package fr.alexisvachard.authenticationpoc.web.dto.response;

public class TwoFAStatusResponseDto {

    private boolean isUsingTwoFA;

    public TwoFAStatusResponseDto() {
    }

    public TwoFAStatusResponseDto(boolean isUsingTwoFA) {
        this.isUsingTwoFA = isUsingTwoFA;
    }

    public boolean isUsingTwoFA() {
        return isUsingTwoFA;
    }

    public void setUsingTwoFA(boolean usingTwoFA) {
        isUsingTwoFA = usingTwoFA;
    }
}
