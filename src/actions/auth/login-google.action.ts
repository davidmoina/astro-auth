import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

export const loginWithGoogle = defineAction({
  accept: "json",
  input: z.any(),
  handler: async (credentials) => {
    const credential = GoogleAuthProvider.credentialFromResult(credentials);

    if (!credential) {
      throw new Error("Invalid google sign in credentials");
    }

    const userCredential = await signInWithCredential(
      firebase.auth,
      credential
    );

    return {
      id: userCredential.user.uid,
      name: userCredential.user.displayName,
      email: userCredential.user.email,
    };
  },
});
