export function isValidPassword(password: string): boolean {
    // Minimum length 8 characters, maximum length 128 characters
    if (password.length < 8 || password.length > 128) {
        return false;
    }

    // At least one uppercase letter
    const hasUppercase = /(?=.*[A-Z])/.test(password);
    // At least one lowercase letter
    const hasLowercase = /(?=.*[a-z])/.test(password);
    // At least one digit
    const hasDigit = /(?=.*\d)/.test(password);
    // At least one special character
    const hasSpecialChar = /(?=.*[!@#$%^&*])/.test(password);

    return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
}