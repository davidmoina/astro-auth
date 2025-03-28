import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ["/protected"];
const notProtectedRoutes = ["/login", "/register"];

export const onRequest = defineMiddleware((context, next) => {
  const { locals, redirect, url } = context;

  const user = firebase.auth.currentUser;
  const isUserLoggedIn = !!user;

  locals.isUserLoggedIn = isUserLoggedIn;
  if (user) {
    locals.user = {
      email: user.email!,
      name: user.displayName!,
      avatar: user.photoURL ?? "",
      emailVerified: user.emailVerified,
    };
  }

  if (!isUserLoggedIn && privateRoutes.includes(url.pathname)) {
    return redirect("/");
  }

  if (isUserLoggedIn && notProtectedRoutes.includes(url.pathname)) {
    return redirect("/");
  }

  return next();
});
