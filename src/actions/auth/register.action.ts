import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from "firebase/auth";

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    remember: z.boolean().optional(),
  }),
  handler: async (input, context) => {
    const { name, email, password, remember } = input;

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
      const userCredential = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await sendEmailVerification(userCredential.user, {
        url: `${import.meta.env.WEBSITE_BASE_URL}/protected?emailVerified=true`,
      });

      return {
        id: userCredential.user.uid,
        name,
        email: userCredential.user.email,
      };
    } catch (error) {
      console.error(error);
      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/email-already-in-use") {
        throw new Error("Email already in use");
      }

      throw new Error("Failed to register user");
    }
  },
});
