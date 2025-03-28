import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
import { firebase } from "@/firebase/config";

export const loginUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    remember: z.boolean().optional(),
  }),
  handler: async (input, context) => {
    const { email, password, remember } = input;

    const { cookies } = context;

    if (remember) {
      cookies.set("email", email, {
        path: "/",
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });
    } else {
      cookies.delete("email", {
        path: "/",
      });
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      return {
        id: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
      };
    } catch (error) {
      console.error(error);
      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/wrong-password") {
        throw new Error("Wrong password");
      }

      if (firebaseError.code === "auth/user-not-found") {
        throw new Error("User not found");
      }

      throw new Error("Failed to login user");
    }
  },
});
