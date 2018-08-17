package fr.alexisvachard.authenticationpoc.web.secure.dto.account;

public class TwoFAStatusDto {

    private boolean isUsing2FA;

    public TwoFAStatusDto() {
    }

    public TwoFAStatusDto(boolean isUsing2FA) {
        this.isUsing2FA = isUsing2FA;
    }

    public boolean isUsing2FA() {
        return isUsing2FA;
    }

    public void setUsing2FA(boolean using2FA) {
        isUsing2FA = using2FA;
    }
}
