import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_API_KEY: z.string().min(1),
    NEXT_PUBLIC_AUTH_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_STORAGE_BUCKET: z.string().min(1),
    NEXT_PUBLIC_MESSAGING_SENDER_ID: z.string().min(1),
    NEXT_PUBLIC_APP_ID: z.string().min(1),
    NEXT_PUBLIC_MEASUREMENT_ID: z.string().min(1),
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_KEY: process.env.apiKey,
    NEXT_PUBLIC_AUTH_DOMAIN: process.env.authDomain,
    NEXT_PUBLIC_PROJECT_ID: process.env.projectId,
    NEXT_PUBLIC_STORAGE_BUCKET: process.env.storageBucket,
    NEXT_PUBLIC_MESSAGING_SENDER_ID:
      process.env.messengerSenderId,
    NEXT_PUBLIC_APP_ID: process.env.appId,
    NEXT_PUBLIC_MEASUREMENT_ID: process.env.measurementId,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
