package alex.dev.urlshortener;

import java.security.SecureRandom;

public final class Base62 {

    private static final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    private static final int BASE = ALPHABET.length();
    private static final int MAX_LENGTH = 7;

    private static final SecureRandom RANDOM = new SecureRandom();

    private Base62() {

    }

    public static String generateCode() {
        return generateCode(MAX_LENGTH);
    }

    public static String generateCode(int length) {
        if (length < 1 || length > MAX_LENGTH) {
            throw new IllegalArgumentException("O tamanho deve estar entre 1 e 7 caracteres");
        }

        StringBuilder code = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = RANDOM.nextInt(BASE);
            code.append(ALPHABET.charAt(index));
        }

        return code.toString();
    }
}
