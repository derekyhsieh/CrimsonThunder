export function mapAuthCodeToMessage(authCode: string) {
  switch (authCode) {
    case "auth/invalid-password": return "The password provided is incorrect.";

    case "auth/email-already-in-use": return "The email provided is already in use. Please log in";

    case "auth/invalid-email": return "The email provided is invalid.";

    case "auth/wrong-password": return "The password entered is incorrect.";

    case "auth/user-not-found": return "The email provided is not associated with an account.";


    default:
      return "An unknown error occurred. Please try again later.";
  }
}
