import { registerUser } from "./auth/register.action";
import { logoutUser } from "./auth/logout.action";
import { loginUser } from "./auth/login.action";
import { loginWithGoogle } from "./auth/login-google.action";

export const server = {
  registerUser,
  logoutUser,
  loginUser,
  loginWithGoogle,
};
