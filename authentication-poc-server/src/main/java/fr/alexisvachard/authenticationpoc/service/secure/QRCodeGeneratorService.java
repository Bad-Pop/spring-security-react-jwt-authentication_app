package fr.alexisvachard.authenticationpoc.service.secure;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import fr.alexisvachard.authenticationpoc.exception.AppException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class QRCodeGeneratorService {

    private final String URI_ISSUER = "Authentication%20POC";

    public byte[] generate2FAQRCode(String username, String secret) throws AppException, WriterException, IOException {

        if (!StringUtils.hasText(username) || !StringUtils.hasText(secret)) {
            throw new AppException("Invalid username or secret key ! Unable to generate QR Code...");
        }

        String uri = "otpauth://totp/" + URI_ISSUER + ":" + username + "?secret=" + secret + "&issuer=" + URI_ISSUER;

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(uri, BarcodeFormat.QR_CODE, 256, 256);

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);

//        byte[] pngData = pngOutputStream.toByteArray();
        return pngOutputStream.toByteArray();
    }
}
