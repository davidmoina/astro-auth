interface User {
  email: string;
  name: string;
  avatar: string;
  emailVerified: boolean;
}

declare namespace App {
  interface Locals {
    isUserLoggedIn: boolean;
    user: User | null;
  }
}
