package fr.alexisvachard.authenticationpoc.web.secure.dto.account;

public class EnableTwoFAStepOneResponseDto {

    private boolean status;
    private byte[] qrCodeByteData;

    public EnableTwoFAStepOneResponseDto() {
    }

    public EnableTwoFAStepOneResponseDto(boolean status, byte[] qrCodeByteData) {
        this.status = status;
        this.qrCodeByteData = qrCodeByteData;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public byte[] getQrCodeByteData() {
        return qrCodeByteData;
    }

    public void setQrCodeByteData(byte[] qrCodeByteData) {
        this.qrCodeByteData = qrCodeByteData;
    }
}
