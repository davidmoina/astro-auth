// This file not works because the file name is different to only middleware.ts

import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ["/protected"];

export const onRequest = defineMiddleware((context, next) => {
  const { url, request } = context;

  const authHeaders = request.headers.get("Authorization") ?? "";

  if (privateRoutes.includes(url.pathname)) {
    return checkLocalAuth(authHeaders, next);
  }

  return next();
});

const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
  if (!authHeaders || authHeaders.length === 0) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "www-authenticate": 'Basic realm="Auth App"',
      },
    });
  }

  const authToken = authHeaders.split(" ")[1];
  const decodedToken = atob(authToken).split(":");

  const [username, password] = decodedToken;

  if (username !== "admin" || password !== "admin") {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "www-authenticate": 'Basic realm="Auth App"',
      },
    });
  }

  return next();
};
